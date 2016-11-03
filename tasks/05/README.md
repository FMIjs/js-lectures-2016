1. Create a simple EventEmitter implementation with two methods - on(eventName, callback) /subscribe/, emit(eventName, data)

2. Create a LineReader stream that reads a file when necessary and splits the content in lines. Create another stream that accepts multiple arguments that represent file name paths and when piped to another streams uses a LineReader for each individual file to concat the lines of each

```
File 1               File 2                File 3
  |                    |                     |
  |                    |                     |
  ---------------------|----------------------
                       |
                    Output:

 File 1 Line 1    File 2 Line 1    File 3 Line 1
 File 1 Line 2    File 2 Line 2    File 3 Line 2
```