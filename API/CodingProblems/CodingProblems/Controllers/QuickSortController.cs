using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CodingProblems.Controllers
{
    internal class QuickSortController
    {
        public void Sort(int[] arr, int start, int end) 
        {
            if (end <= start) return;

            int pivot = partition(arr, start, end);

            Sort(arr, start, pivot - 1);
            Sort(arr, pivot + 1, end);
        }

        private static int partition(int[] arr, int start, int end)
        {
            int pivot = arr[end];
            int i = start - 1;

            for (int j = start; j <= end - 1; j++)
            {
                if (arr[j] < pivot)
                {
                    i++;
                    int innerTemp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = innerTemp;
                }
            }
            i++;
            int temp = arr[i];
            arr[i] = arr[end];
            arr[end] = temp;
            return i;
        }
    }
}
