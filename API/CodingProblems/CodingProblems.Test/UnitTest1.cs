using CodingProblems.Controllers;
using Xunit;

namespace CodingProblems.Test
{
    public class UnitTest1
    {
        [Fact]
        public void Sort_ShouldSortArrayAscending()
        {
            var controller = new BubbleSortController();
            int[] input = { 4, 6, 5, 2, 3, 1, 8, 9, 7 };
            int[] expected = { 1, 2, 3, 4, 5, 6, 7, 8, 9 };

            controller.Sort(input);

            Assert.Equal(expected, input);
        }
    }
}
