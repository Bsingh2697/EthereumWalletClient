export type StringOrNull = string | null;

export enum API_REQUEST {
    GET = "GET",
    POST = "POST",
    PATCH = "PATCH",
    PUT = "PUT",
    DELETE = "DELETE"
}

export enum API_HEADERS {
    CONTENT_TYPE = "Content-Type",
    AUTHORIZATION = "Authorization",
    TYPE_FORM_DATA = "multipart/form-data",
    TYPE_RAW_DATA = "application/json",
    TYPE_MULTIPART_DATA = "multipart/form-data",
    TOKEN_TYPE = "Bearer"
}

export interface ApiResponseStatus {
    code : number,
    message : string
}

export type ApiErrorType={
    [key : string]: Array<string>
}

export type TokenType = {
    access: string,
    refresh: string
}

export interface ApiResponse<T> {
    status: ApiResponseStatus,
    data: T,
    errors?: ApiErrorType
}