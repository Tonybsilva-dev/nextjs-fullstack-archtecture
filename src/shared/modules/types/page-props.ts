export type PageProps<TParams = {}> = {
  params: TParams & { locale: string };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
  locale: string;
};
