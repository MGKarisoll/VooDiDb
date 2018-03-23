namespace VooDiDb.Services.Core
{
    public class PostDTO
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public bool IsActive { get; set; }
        public byte[] RowVersion { get; set; }
        public int SortOrder { get; set; }
    }
}