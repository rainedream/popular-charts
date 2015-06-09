using System;
using System.Collections.Generic;
using System.Web.Http;
using DataService.Models;

namespace DataService.Controllers
{
    [RoutePrefix("shcomp")]
    public class ShanghaiCompositeIndexController : ApiController
    {
        private const double BaseIndexValue = 5000.0;
        private const int ChangeLimitationInPercentage = 3;

        [HttpGet]
        [Route("")]
        public Index RandomIndex()
        {
            return RandomIndex(BaseIndexValue);
        }

        [HttpGet]
        [Route("multi/{count}")]
        public IList<Index> RandomMultiIndices(double count)
        {
            DateTime now = DateTime.Now;

            var indices = new List<Index> {BuildIndex(now.AddSeconds((count - 1) * -1), RandomIndexValue(BaseIndexValue))};
            for (int i = indices.Count; i < count; i++)
            {
                var lastIndex = indices[indices.Count - 1];
                indices.Add(BuildIndex(now.AddSeconds((count - 1 - i) * -1), RandomIndexValue(lastIndex.Value)));
            }
            return indices;
        }

        [HttpGet]
        [Route("last/{lastIndex}")]
        public Index RandomIndex(double lastIndex)
        {
            return BuildIndex(DateTime.Now, RandomIndexValue(lastIndex));
        }

        private Index BuildIndex(DateTime timestamp, double value)
        {
            return new Index { Time = timestamp.ToString("HH:mm:ss"), Value = value };
        }

        private double RandomIndexValue(double lastIndex)
        {
            var random = new Random(Guid.NewGuid().GetHashCode());
            var up = random.NextDouble() < 0.5 ? -1 : 1;
            double randomChangedPercent = random.Next(ChangeLimitationInPercentage * 100) / 100.0;
            double change = lastIndex * (randomChangedPercent / 100);

            return Retain2Digits(lastIndex + change * up);
        }

        private double Retain2Digits(double value)
        {
            return ((int)(value * 100)) / 100.0;
        }
    }
}