/**
 * use this type definition instead of `Function` type constructor
 */
export type AnyFunction = (...args: any[]) => any;

/**
 * simple alias to save you keystrokes when defining JS typed object maps
 */
export type StringMap<T> = { [key: string]: T };

export type ActionsUnion<A extends StringMap<AnyFunction>> = ReturnType<A[keyof A]>;

export interface AssetPageRef {
    [key: number]: number[];
}

export type Pagination = {
    page: number;
    total_pages: number;
    total_results: number;
    pageLoads: number[];
    assetIds?: number[];
};
export type Asset = {
    name?: string;
    tagline?: string;
    backdrop_path?: string;
    genre_ids?: number[];
    id: number;
    media_type?: string;
    original_language?: string;
    original_title?: string;
    overview?: string;
    popularity?: number;
    poster_path?: string;
    release_date?: string;
    title?: string;
    video?: boolean;
    vote_average: number;
    vote_count?: number;
    genres?: { id: number; name: string }[];
    type?: string;
};
