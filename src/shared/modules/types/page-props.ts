import { useRouter } from 'next/navigation'; // Correção: Tipo para Router foi descontinuado, você usará uma função.

/**
 * Tipagem genérica para representar propriedades padrão de uma página.
 *
 * @template TParams - Tipo genérico para os parâmetros da página (opcional).
 *
 * Propriedades:
 * - `params`:
 *   - Contém informações e funcionalidades adicionais relacionadas à página.
 *   - Inclui a função `translations` para facilitar o acesso a traduções.
 *   - Pode incluir o idioma da página via `locale`.
 *
 * - `searchParams`:
 *   - Contém parâmetros opcionais usados frequentemente em listagens, como paginação, ordenação e filtros.
 *   - Inclui suporte a parâmetros personalizados como `filter_${string}` para filtros dinâmicos.
 *
 * - `locale`:
 *   - Define o idioma da página (caso disponível).
 */
export type PageProps<TParams = {}> = {
  /**
   * Parâmetros principais da página.
   *
   * - Pode incluir propriedades personalizadas através do tipo genérico `TParams`.
   * - Também contém:
   *   - `locale`: Idioma opcional da página.
   *   - `translations`: Função para acessar traduções de textos.
   */
  params: TParams & {
    /**
     * Idioma da página (opcional).
     */
    locale?: string;
    /**
     * Função de tradução.
     *
     * @param key - Chave de tradução, ex.: 'welcome_message'.
     * @param params - Parâmetros dinâmicos para interpolação de textos.
     * @returns O texto traduzido correspondente.
     */
    translations: (
      key: string,
      params?: Record<string, string | number>
    ) => string;
  };
  /**
   * Parâmetros opcionais para busca e filtragem.
   *
   * Usado com frequência em tabelas, listagens ou buscas globais.
   *
   * - `page`: Número da página para paginação.
   * - `limit`: Número de itens por página.
   * - `sort`: Nome do campo usado para ordenação.
   * - `order`: Direção da ordenação ('asc' ou 'desc').
   * - `query`: Termo de busca.
   * - `filter`: Parâmetro genérico para filtro.
   * - `filter_${string}`: Filtros dinâmicos para contextos específicos.
   */
  searchParams?: {
    /**
     * Número da página atual para paginação.
     *
     * @example '1'
     */
    page?: string;
    /**
     * Número máximo de itens exibidos por página.
     *
     * @example '10'
     */
    limit?: string;
    /**
     * Campo usado para ordenar os resultados.
     *
     * @example 'name', 'created_at'
     */
    sort?: string;
    /**
     * Direção da ordenação.
     *
     * - `asc`: Ordenação ascendente.
     * - `desc`: Ordenação descendente.
     *
     * @example 'asc'
     */
    order?: 'asc' | 'desc';
    /**
     * Termo de busca utilizado para filtrar os resultados.
     *
     * @example 'John Doe'
     */
    query?: string;
    /**
     * Filtro genérico.
     *
     * @example 'active'
     */
    filter?: string;
    /**
     * Filtros personalizados com chave dinâmica.
     *
     * @example 'filter_status', 'filter_category'
     */
    [key: `filter_${string}`]: string | undefined;
    /**
     * Outros parâmetros adicionais não especificados.
     */
    [key: string]: string | string[] | undefined;
  };
  router?: ReturnType<typeof useRouter>;
};
