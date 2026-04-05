import Map "mo:core/Map";
import Set "mo:core/Set";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import Float "mo:core/Float";

import MixinStorage "blob-storage/Mixin";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import Storage "blob-storage/Storage";

// Use migration function on upgrades

actor {
  include MixinStorage();

  // Authorization system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Data Types
  type Profile = {
    name : Text;
    age : Nat;
    bio : Text;
    interests : [Text];
    photo : ?Storage.ExternalBlob;
    isComplete : Bool;
    createdAt : Time.Time;
    updatedAt : Time.Time;
    latitude : ?Float;
    longitude : ?Float;
  };

  module Profile {
    public func compare(p1 : Profile, p2 : Profile) : Order.Order {
      Int.compare(p1.createdAt, p2.createdAt);
    };
  };

  type NotificationType = {
    #newMatch;
    #tipReceived;
    #newMessage;
  };

  type Message = {
    sender : Principal;
    receiver : Principal;
    content : Text;
    timestamp : Time.Time;
  };

  module Message {
    public func compare(m1 : Message, m2 : Message) : Order.Order {
      Int.compare(m1.timestamp, m2.timestamp);
    };
  };

  type Notification = {
    id : Text;
    user : Principal;
    notificationType : NotificationType;
    message : Text;
    isRead : Bool;
    timestamp : Time.Time;
  };

  module Notification {
    public func compare(n1 : Notification, n2 : Notification) : Order.Order {
      Int.compare(n1.timestamp, n2.timestamp);
    };
  };

  type Tip = {
    from : Principal;
    to : Principal;
    amount_e8s : Nat;
    timestamp : Time.Time;
  };

  module Tip {
    public func compare(t1 : Tip, t2 : Tip) : Order.Order {
      Int.compare(t1.timestamp, t2.timestamp);
    };
  };

  type Match = {
    user1 : Principal;
    user2 : Principal;
    timestamp : Time.Time;
  };

  module Match {
    public func compare(m1 : Match, m2 : Match) : Order.Order {
      Int.compare(m1.timestamp, m2.timestamp);
    };
  };

  type LeaderboardEntry = {
    user : Principal;
    name : Text;
    totalSent : Nat;
  };

  type Review = {
    reviewerId : Principal;
    targetId : Principal;
    rating : Nat;
    text : Text;
    timestamp : Time.Time;
  };

  module Review {
    public func compare(r1 : Review, r2 : Review) : Order.Order {
      Int.compare(r2.timestamp, r1.timestamp);
    };
  };

  // Storage
  let profiles = Map.empty<Principal, Profile>();
  let likes = Map.empty<Principal, Set.Set<Principal>>();
  let dislikes = Map.empty<Principal, Set.Set<Principal>>();
  let matches = Map.empty<Principal, Set.Set<Principal>>();
  let messages = Map.empty<Principal, List.List<Message>>();
  let tips = Map.empty<Principal, List.List<Tip>>();
  let tipsSent = Map.empty<Principal, Nat>();
  let notifications = Map.empty<Principal, List.List<Notification>>();
  let reviews = Map.empty<Principal, List.List<Review>>();

  // Profile Management
  public shared ({ caller }) func createOrUpdateProfile(profile : Profile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create or update profiles.");
    };
    if (profile.name == "") {
      Runtime.trap("Name cannot be empty.");
    };

    let isComplete = profile.name != "" and profile.age > 0 and profile.bio != "";
    let newProfile : Profile = {
      profile with
      isComplete;
      createdAt = Time.now();
      updatedAt = Time.now();
    };

    profiles.add(caller, newProfile);
  };

  public shared ({ caller }) func setProfilePicture(pic : Storage.ExternalBlob) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update profile picture.");
    };
    switch (profiles.get(caller)) {
      case (null) { Runtime.trap("Profile not found."); };
      case (?profile) {
        let updatedProfile : Profile = {
          profile with
          photo = ?pic;
          updatedAt = Time.now();
        };
        profiles.add(caller, updatedProfile);
      };
    };
  };

  public query ({ caller }) func getCallerProfile() : async ?Profile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get profiles.");
    };
    profiles.get(caller);
  };

  public query ({ caller }) func getProfile(principal : Principal) : async ?Profile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get profiles.");
    };
    profiles.get(principal);
  };

  public query ({ caller }) func getAllProfiles() : async [Profile] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can get all profiles.");
    };
    profiles.values().toArray().sort();
  };

  public query ({ caller }) func getExploreProfiles() : async [Profile] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can get matches.");
    };

    profiles.entries().toArray().filter(
      func((principal, _)) { principal != caller }
    ).map(
      func((_, profile)) { profile }
    );
  };

  public query ({ caller }) func isProfileComplete(user : Principal) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can check profile completion.");
    };
    switch (profiles.get(user)) {
      case (null) { false };
      case (?profile) { profile.isComplete };
    };
  };

  public query ({ caller }) func getUserCount() : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can get all profiles.");
    };
    profiles.size();
  };

  // Likes & Matches
  public shared ({ caller }) func likeUser(other : Principal) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can like other users.");
    };
    if (caller == other) {
      Runtime.trap("You cannot like yourself.");
    };
    switch (profiles.get(other)) {
      case (null) { Runtime.trap("User not found."); };
      case (_) {};
    };

    addLike(caller, other);

    if (hasMutualLike(other, caller)) {
      createMatch(caller, other);
      return true;
    };
    false;
  };

  func addLike(user : Principal, other : Principal) {
    var userLikes = switch (likes.get(user)) {
      case (null) { Set.empty<Principal>() };
      case (?set) { set };
    };
    if (userLikes.contains(other)) {
      Runtime.trap("Already liked this user.");
    };
    userLikes.add(other);
    likes.add(user, userLikes);
  };

  func hasMutualLike(user1 : Principal, user2 : Principal) : Bool {
    switch (likes.get(user1)) {
      case (null) { false };
      case (?set) { set.contains(user2) };
    };
  };

  func createMatch(user1 : Principal, user2 : Principal) {
    addMatch(user1, user2);
    addMatch(user2, user1);

    let notification1 : Notification = {
      id = Time.now().toText();
      user = user1;
      notificationType = #newMatch;
      message = "You've matched with " # user2.toText();
      isRead = false;
      timestamp = Time.now();
    };
    addNotification(user1, notification1);

    let notification2 : Notification = {
      notification1 with
      id = (Time.now() + 1).toText();
      user = user2;
    };
    addNotification(user2, notification2);
  };

  func addMatch(user : Principal, other : Principal) {
    var userMatches = switch (matches.get(user)) {
      case (null) { Set.empty<Principal>() };
      case (?set) { set };
    };
    if (userMatches.contains(other)) {
      Runtime.trap("Already matched with this user.");
    };
    userMatches.add(other);
    matches.add(user, userMatches);
  };

  public shared ({ caller }) func dislikeUser(other : Principal) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can dislike others.");
    };
    if (caller == other) {
      Runtime.trap("You cannot dislike yourself.");
    };
    switch (profiles.get(other)) {
      case (null) { Runtime.trap("User not found."); };
      case (_) {};
    };

    var userDislikes = switch (dislikes.get(caller)) {
      case (null) { Set.empty<Principal>() };
      case (?set) { set };
    };
    if (userDislikes.contains(other)) {
      Runtime.trap("Already disliked this user.");
    };
    userDislikes.add(other);
    dislikes.add(caller, userDislikes);
  };

  public query ({ caller }) func getMatches() : async [Profile] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get matches.");
    };
    let userMatches = switch (matches.get(caller)) {
      case (null) { Set.empty<Principal>() };
      case (?set) { set };
    };
    userMatches.toArray().filterMap(
      func(principal) {
        if (principal == caller) { return null };
        profiles.get(principal);
      }
    );
  };

  // Tipping
  public shared ({ caller }) func tip(user : Principal, amount_e8s : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can tip.");
    };
    if (caller == user) {
      Runtime.trap("Cannot tip yourself.");
    };
    addTip(user, { from = caller; to = user; amount_e8s; timestamp = Time.now() });

    // Track tips sent by caller for leaderboard
    let prevSent = switch (tipsSent.get(caller)) {
      case (null) { 0 };
      case (?n) { n };
    };
    tipsSent.add(caller, prevSent + amount_e8s);

    let notification : Notification = {
      id = Time.now().toText();
      user;
      notificationType = #tipReceived;
      message = "You've received a tip of " # amount_e8s.toText() # " e8s!";
      isRead = false;
      timestamp = Time.now();
    };
    addNotification(user, notification);
  };

  func addTip(user : Principal, tip : Tip) {
    var userTips = switch (tips.get(user)) {
      case (null) { List.empty<Tip>() };
      case (?list) { list };
    };
    userTips.add(tip);
    tips.add(user, userTips);
  };

  public query ({ caller }) func getTipHistory(user : Principal) : async [Tip] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get tips.");
    };
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own tip history.");
    };
    switch (tips.get(user)) {
      case (null) { [] };
      case (?list) { list.toArray().sort() };
    };
  };

  public query ({ caller }) func getTotalTips(user : Principal) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get tip history.");
    };
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own total tips.");
    };
    switch (tips.get(user)) {
      case (null) { 0 };
      case (?list) {
        var total = 0;
        for (tip in list.values()) { total += tip.amount_e8s };
        total;
      };
    };
  };

  public query ({ caller }) func getTopTippedUsers() : async [Principal] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view top tipped users.");
    };
    var users = List.empty<(Principal, Nat)>();
    for ((user, tipList) in tips.entries()) {
      var total = 0;
      for (tip in tipList.values()) {
        total += tip.amount_e8s;
      };
      users.add((user, total));
    };

    func compareTips(a : (Principal, Nat), b : (Principal, Nat)) : Order.Order {
      Nat.compare(b.1, a.1);
    };

    users.toArray().sort(compareTips).map(func((principal, _)) { principal });
  };

  // Leaderboard - top AFUK tippers (by amount sent)
  public query ({ caller }) func getLeaderboard(limit : Nat) : async [LeaderboardEntry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view the leaderboard.");
    };

    var entries = List.empty<(Principal, Nat)>();
    for ((user, totalSent) in tipsSent.entries()) {
      entries.add((user, totalSent));
    };

    func compareEntries(a : (Principal, Nat), b : (Principal, Nat)) : Order.Order {
      Nat.compare(b.1, a.1);
    };

    let sorted = entries.toArray().sort(compareEntries);
    // Cap to limit by iterating manually
    let result = List.empty<LeaderboardEntry>();
    var count = 0;
    for ((user, totalSent) in sorted.vals()) {
      if (count < limit) {
        let name = switch (profiles.get(user)) {
          case (null) { "Anonymous" };
          case (?p) { p.name };
        };
        result.add({ user; name; totalSent });
        count += 1;
      };
    };
    result.toArray();
  };

  // Reviews
  public shared ({ caller }) func submitReview(target : Principal, rating : Nat, text : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit reviews.");
    };
    if (caller == target) {
      Runtime.trap("Cannot review yourself.");
    };
    if (rating < 1 or rating > 5) {
      Runtime.trap("Rating must be between 1 and 5.");
    };

    let newReview : Review = {
      reviewerId = caller;
      targetId = target;
      rating;
      text;
      timestamp = Time.now();
    };

    var targetReviews = switch (reviews.get(target)) {
      case (null) { List.empty<Review>() };
      case (?list) { list };
    };

    // Replace existing review from same reviewer if present
    let filtered = List.empty<Review>();
    for (r in targetReviews.values()) {
      if (r.reviewerId != caller) {
        filtered.add(r);
      };
    };
    filtered.add(newReview);
    reviews.add(target, filtered);
  };

  public query ({ caller }) func getReviews(user : Principal) : async [Review] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get reviews.");
    };
    switch (reviews.get(user)) {
      case (null) { [] };
      // Fix: sort() uses implicit compare, no explicit Review.compare argument
      case (?list) { list.toArray().sort() };
    };
  };

  public query ({ caller }) func getAverageRating(user : Principal) : async Float {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get ratings.");
    };
    switch (reviews.get(user)) {
      case (null) { 0.0 };
      case (?list) {
        let arr = list.toArray();
        if (arr.size() == 0) { return 0.0 };
        var sum = 0;
        for (r in arr.vals()) { sum += r.rating };
        // Fix: use .toFloat() instead of deprecated Float.fromInt()
        sum.toFloat() / arr.size().toFloat();
      };
    };
  };

  // Messaging
  public shared ({ caller }) func sendMessage(to : Principal, content : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can send messages.");
    };
    let hasMatch = switch (matches.get(caller)) {
      case (null) { false };
      case (?set) { set.contains(to) };
    };
    if (not hasMatch) { Runtime.trap("You can only message your matches."); };
    addMessage({
      sender = caller;
      receiver = to;
      content;
      timestamp = Time.now();
    });

    let notification : Notification = {
      id = Time.now().toText();
      user = to;
      notificationType = #newMessage;
      message = "You've received a new message!";
      isRead = false;
      timestamp = Time.now();
    };
    addNotification(to, notification);
  };

  func addMessage(message : Message) {
    var convo = switch (messages.get(message.sender)) {
      case (null) { List.empty<Message>() };
      case (?list) { list };
    };
    convo.add(message);
    messages.add(message.sender, convo);
  };

  public query ({ caller }) func getMessagesWithUser(user : Principal) : async [Message] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get messages.");
    };
    switch (messages.get(caller)) {
      case (null) { [] };
      case (?list) { list.toArray().sort() };
    };
  };

  // Notifications
  func addNotification(user : Principal, notification : Notification) {
    var userNotifications = switch (notifications.get(user)) {
      case (null) { List.empty<Notification>() };
      case (?list) { list };
    };
    userNotifications.add(notification);
    notifications.add(user, userNotifications);
  };

  public query ({ caller }) func getNotifications() : async [Notification] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get notifications.");
    };
    switch (notifications.get(caller)) {
      case (null) { [] };
      case (?list) { list.toArray().sort() };
    };
  };

  public shared ({ caller }) func markNotificationAsRead(notificationId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update notifications.");
    };

    switch (notifications.get(caller)) {
      case (null) { Runtime.trap("No notifications found") };
      case (?list) {
        let updatedNotifications = List.empty<Notification>();
        for (notification in list.values()) {
          if (notification.id == notificationId) {
            updatedNotifications.add({ notification with isRead = true });
          } else {
            updatedNotifications.add(notification);
          };
        };
        notifications.add(caller, updatedNotifications);
      };
    };
  };

  public shared ({ caller }) func markAllNotificationsAsRead() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update notifications.");
    };

    switch (notifications.get(caller)) {
      case (null) { Runtime.trap("No notifications found") };
      case (?list) {
        let updatedNotifications = List.empty<Notification>();
        for (notification in list.values()) {
          updatedNotifications.add({ notification with isRead = true });
        };
        notifications.add(caller, updatedNotifications);
      };
    };
  };

  // Activity Feed
  public query ({ caller }) func getActivityFeed() : async ([(Notification, Nat)]) {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get activities.");
    };

    switch (notifications.get(caller)) {
      case (null) { [] };
      case (?list) {
        list.toArray().filterMap(
          func(notification) {
            switch (notification.notificationType) {
              case (#tipReceived) {
                ?(notification, switch (tips.get(caller)) {
                  case (null) { 0 };
                  case (?list) { list.toArray().sort().size() };
                });
              };
              case (_) { null };
            };
          }
        );
      };
    };
  };

  // Clear All Data (for testing)
  public shared ({ caller }) func clearAllData() : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can clear all data.");
    };

    profiles.clear();
    likes.clear();
    dislikes.clear();
    matches.clear();
    messages.clear();
    tips.clear();
    tipsSent.clear();
    notifications.clear();
    reviews.clear();
  };

  public shared ({ caller }) func deleteProfile(user : Principal) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can delete their profile.");
    };
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only delete your own profile.");
    };
    profiles.remove(user);
    likes.remove(user);
    dislikes.remove(user);
    matches.remove(user);
    messages.remove(user);
    tips.remove(user);
    tipsSent.remove(user);
    notifications.remove(user);
    reviews.remove(user);
  };

  // Required frontend interface functions
  public query ({ caller }) func getCallerUserProfile() : async ?Profile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get profiles.");
    };
    profiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?Profile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get profiles.");
    };
    profiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : Profile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles.");
    };
    if (profile.name == "") {
      Runtime.trap("Name cannot be empty.");
    };

    let isComplete = profile.name != "" and profile.age > 0 and profile.bio != "";
    let newProfile : Profile = {
      profile with
      isComplete;
      createdAt = Time.now();
      updatedAt = Time.now();
    };

    profiles.add(caller, newProfile);
  };
};
