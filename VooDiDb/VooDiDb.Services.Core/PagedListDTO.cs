using System.Collections.Generic;
using System.Linq;

namespace VooDiDb.Services.Core {
    public class PagedList<T> {
        public long Page { get; set; }
        public long MaxPages { get; set; }
        public long Size => this.Items?.LongCount() ?? 0;
        public IEnumerable<T> Items { get; set; }

        public PagedList(long page, long max, IEnumerable<T> items) {
            this.Page = page;
            this.MaxPages = max;
            this.Items = items;
        }
    }
}
