﻿namespace FSPodium_Parser.Web.Response;

public record Response
{
    public bool Success { get; init; }
    public string Message { get; init; } = string.Empty;
    public int StatusCode { get; init; }
}