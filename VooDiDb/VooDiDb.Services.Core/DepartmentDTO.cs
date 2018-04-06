namespace VooDiDb.Services.Core
{
    public class DepartmentDTO
    {
        public long Id { get; set; }
        public long? ParentId { get; set; }
        public string Name { get; set; }
        public string FullName { get; set; }
        public bool IsActive { get; set; }
        public int SortOrder { get; set; }
        public byte [] RowVersion { get; set; }
    }
}