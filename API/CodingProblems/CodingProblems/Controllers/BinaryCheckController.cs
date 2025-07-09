using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CodingProblems.Controllers
{
    internal class BinaryCheckController
    {
        public bool CheckBinary(int input)
        {
            if (input == 0 || input == 1 || input < 0) return false;

            while (input != 0)
            {
                if (input % 10 > 1)
                {
                    return false;
                }    

                input = input / 10;
            }

            return true;
        }
    }
}
