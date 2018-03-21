using System.Security.Cryptography;
using System.Text;

namespace VooDiDb.Utilites.Util
{
    public static class Security
    {
        public static string GetMd5HashString(string value)
        {
            var hash = new StringBuilder();
            var md5Provider = new MD5CryptoServiceProvider();
            var bytes = md5Provider.ComputeHash(new UTF8Encoding().GetBytes(value));

            foreach (var t in bytes)
                hash.Append(t.ToString("x2"));

            return hash.ToString();
        }
    }
}