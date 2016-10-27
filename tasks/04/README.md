1. Using promises read the contents from the given files and parse the data. Calculate each student score depending on his marks and the total amount of credits (score = 2 receives - 0 credits ). The given credits (in credits.txt) are for excellent score of 6. Save the results in results.txt file. (Use Promise.all method)

    ### Input:
    ---

    Students file:
    ```
    Ivan Ivanov 441
    Petko Petkov 442
    Alex Alexandrov 443
    ```

    Marks file:
    ```
    441 5.0 5.5 6.0
    442 3.5 4.0 4.0
    443 6.0 6.0 6.0
    ```

    Credits file:
    ```
    mathematics literature geography
    10.0 10.0 8.0
    ```
    ### Output file:
    ---

    ```
    {"name":"Ivan  Ivanov","mathematics":"8.33","literature":"9.17","geography":"8.00"},
    {"name":"Petko  Petkov","mathematics":"5.83","literature":"6.67","geography":"5.33"},
    {"name":"Alex  Alexandrov","mathematics":"10.00","literature":"10.00","geography":"8.00"}
    ```
2. Use the logic from Task 1 but this time use a generator instead of Promise.all. Create a function calculate that receives the generator as argument. It should start the generator and force it's execution unitl there are no operations left.