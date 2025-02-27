type FetchOptions = {
  path: string;
  body: any;
  onSuccess: () => void | Promise<void>;
  onError: (error: any) => void;
};

export function useSubmit() {
  const isLoading = ref(false);
  const result = shallowRef<undefined | Record<string, any>>();

  const execute = async ({ path, body, onError, onSuccess }: FetchOptions) => {
    try {
      isLoading.value = true;
      const res = await $fetch<any>(path, {
        method: "POST",
        body,
      });
      await onSuccess();
      result.value = res;
    } catch (error: any) {
      onError(error);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    execute,
    result,
  };
}

export const useTopbarTitle = () => useState("topbar-title", () => "");

export const useSidebarToggle = () => useState("sidebar-state", () => true);

export function defineTopbarTitle(title: string) {
  useTopbarTitle().value = title;
}
