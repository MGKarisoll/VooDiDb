using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;

namespace VooDiDb.Api.Extensions {
    public class Pagination {
        public int Size { get; set; }
        public int Page { get; set; }
    }

    public static class HttpRequestExtension {
        private static readonly Dictionary<HttpRequestMessage, Pagination> s_requests = new Dictionary<HttpRequestMessage, Pagination>();

        public static Pagination GetPagination(this HttpRequestMessage request) {
            return s_requests.TryGetValue(request, out var result) ? result : null;
        }

        public static void SetPagination(this HttpRequestMessage request) {
            try {
                var header = request.Headers.GetValues("X-Pagination").FirstOrDefault();
                if(!string.IsNullOrEmpty(header)) {
                    var keyValuePairs = header.Split(';').Select(s => s.Trim());
                    var valuePairs = keyValuePairs as string[] ?? keyValuePairs.ToArray();
                    var pageString = valuePairs.FirstOrDefault(x => x.StartsWith("page="))?.Replace("page=", string.Empty);
                    var sizeString = valuePairs.FirstOrDefault(x => x.StartsWith("size="))?.Replace("size=", string.Empty);
                    if(int.TryParse(pageString, out var page) && int.TryParse(sizeString, out var size))
                        if(s_requests.ContainsKey(request))
                            s_requests[request] = new Pagination { Page = page, Size = size };
                        else
                            s_requests.Add(request, new Pagination { Page = page, Size = size });
                }
            } catch(Exception exception) {
                Debug.WriteLine(exception);
            }
        }

        public static void SetPagination(this HttpRequestMessage request, Pagination pagination) {
            if(pagination == null) {
                s_requests.Remove(request);
            } else {
                if(s_requests.ContainsKey(request)) s_requests[request] = pagination;
                else s_requests.Add(request, pagination);
            }
        }
    }
}
