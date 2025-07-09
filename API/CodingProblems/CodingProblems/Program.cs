using System;
using CodingProblems.Controllers;

namespace CodingProblems
{
    internal class Program
    {
        static void Main(string[] args)
        {
            var controller = new BubbleSortController();

            int[] arr = { 4, 6, 5, 2, 3, 1, 8, 9, 7 };

            controller.Sort(arr);

            for (int i = 0; i < arr.Length; i++)
            {
                Console.WriteLine(arr[i]);
            }
        }
    }
}
