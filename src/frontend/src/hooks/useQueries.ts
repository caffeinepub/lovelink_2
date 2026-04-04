import type { ExternalBlob } from "@/backend";
import type { Message, Notification, Profile } from "@/backend.d";
import { useActor } from "@/hooks/useActor";
import type { Principal } from "@icp-sdk/core/principal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetCallerProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<Profile | null>({
    queryKey: ["callerProfile"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getCallerProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useGetExploreProfiles() {
  const { actor, isFetching: actorFetching } = useActor();
  return useQuery<Profile[]>({
    queryKey: ["exploreProfiles"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getExploreProfiles();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetMatches() {
  const { actor, isFetching: actorFetching } = useActor();
  return useQuery<Profile[]>({
    queryKey: ["matches"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMatches();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetNotifications() {
  const { actor, isFetching: actorFetching } = useActor();
  return useQuery<Notification[]>({
    queryKey: ["notifications"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getNotifications();
    },
    enabled: !!actor && !actorFetching,
    refetchInterval: 30000,
  });
}

export function useGetActivityFeed() {
  const { actor, isFetching: actorFetching } = useActor();
  return useQuery<Array<[Notification, bigint]>>({
    queryKey: ["activityFeed"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getActivityFeed();
    },
    enabled: !!actor && !actorFetching,
    refetchInterval: 30000,
  });
}

export function useGetMessagesWithUser(user: Principal | null) {
  const { actor, isFetching: actorFetching } = useActor();
  return useQuery<Message[]>({
    queryKey: ["messages", user?.toString()],
    queryFn: async () => {
      if (!actor || !user) return [];
      return actor.getMessagesWithUser(user);
    },
    enabled: !!actor && !actorFetching && !!user,
    refetchInterval: 5000,
  });
}

export function useGetTotalTips(user: Principal | null) {
  const { actor, isFetching: actorFetching } = useActor();
  return useQuery<bigint>({
    queryKey: ["totalTips", user?.toString()],
    queryFn: async () => {
      if (!actor || !user) return 0n;
      return actor.getTotalTips(user);
    },
    enabled: !!actor && !actorFetching && !!user,
  });
}

export function useGetUserProfile(user: Principal | null) {
  const { actor, isFetching: actorFetching } = useActor();
  return useQuery<Profile | null>({
    queryKey: ["userProfile", user?.toString()],
    queryFn: async () => {
      if (!actor || !user) return null;
      return actor.getUserProfile(user);
    },
    enabled: !!actor && !actorFetching && !!user,
  });
}

export function useLikeUser() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (principal: Principal) => {
      if (!actor) throw new Error("Actor not available");
      return actor.likeUser(principal);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["matches"] });
      qc.invalidateQueries({ queryKey: ["notifications"] });
      qc.invalidateQueries({ queryKey: ["exploreProfiles"] });
    },
  });
}

export function useDislikeUser() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (principal: Principal) => {
      if (!actor) throw new Error("Actor not available");
      return actor.dislikeUser(principal);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["exploreProfiles"] });
    },
  });
}

export function useTipUser() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      user,
      amount_e8s,
    }: { user: Principal; amount_e8s: bigint }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.tip(user, amount_e8s);
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["totalTips", vars.user.toString()] });
      qc.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}

export function useSendMessage() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ to, content }: { to: Principal; content: string }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.sendMessage(to, content);
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["messages", vars.to.toString()] });
    },
  });
}

export function useMarkNotificationRead() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.markNotificationAsRead(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}

export function useMarkAllNotificationsRead() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.markAllNotificationsAsRead();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}

export function useSaveProfile() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (profile: Profile) => {
      if (!actor) throw new Error("Actor not available");
      return actor.saveCallerUserProfile(profile as any);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["callerProfile"] });
    },
  });
}

export function useSetProfilePicture() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (pic: ExternalBlob) => {
      if (!actor) throw new Error("Actor not available");
      return actor.setProfilePicture(pic as any);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["callerProfile"] });
    },
  });
}
