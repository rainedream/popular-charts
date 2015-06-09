using System;
using System.Web.Http;
using DataService.Models;

namespace DataService.Controllers
{
    [RoutePrefix("shcomp")]
    public class ShanghaiCompositeIndexController : ApiController
    {
        private const double BaseIndex = 5000.0;
        private const int ChangeLimitationInPercentage = 3;

        [HttpGet]
        [Route("")]
        public Index RandomIndex()
        {
            return RandomIndex(BaseIndex);
        }

        [HttpGet]
        [Route("last/{lastIndex}")]
        public Index RandomIndex(double lastIndex)
        {
            var random = new Random();
            var up = random.NextDouble() < 0.5 ? -1 : 1;
            var randomChangedPercent = random.Next(ChangeLimitationInPercentage * 100) / 100.0;
            var change = BaseIndex*(randomChangedPercent/100);

            var indexValue = BaseIndex + change * up;
            var timestamp = DateTime.Now.ToString("HH:mm:ss");

            return new Index {Time = timestamp, Value = indexValue};
        }
    }
}