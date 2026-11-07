# CodeViz – fixes in this version
- Login / Register: real validation (wrong password, unknown email, duplicate account). Dashboard and Profile need login.
- New About page (route /about, in navbar and footer). Dead footer links now open the filtered problem lists.
- All 30 problems now have a statement, examples, constraints, 3 hints and a reference solution.
- Real code editor (line numbers, Tab, auto-indent, Ctrl+Enter). Code is saved per problem and language.
- Run Tests / Submit: JavaScript runs in a Web Worker against visible + hidden test cases (23 problems). Infinite loops stop after 3 s.
- SQL, Python and Java problems cannot execute without a backend: write the answer and compare it with the sample output and solution.
- New flat slate + teal palette; gradients, emojis and fake statistics removed.
Run: npm install && npm run dev
