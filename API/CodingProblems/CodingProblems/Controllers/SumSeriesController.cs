using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CodingProblems.Controllers
{
    internal class SumSeriesController
    {
        public long SumSeries(long input)
        {
            var sum = 0L;

            for (long i = 1; i <= input; i++)
            {
                sum += (input * (input + 1)) / 2;
            }
            return sum;
        }
    }
}
