SAMPLE DATA:
----------------------------------
1. Sample User
    - Email: graceadmin@gmail.com
    - Password: 12345678
    - Access Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NGRhN2IzZWRmNmI1YjAwOTJlZGE2NyIsImVtYWlsIjoiZ3JhY2VhZG1pbkBnbWFpbC5jb20iLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNzMzMTQyNzA2fQ.Q-8amkput9XQBJjIR4R9-vbXiTWWb7HTPP7PKk1YUN8
    - Data:
    {
        "email": "graceadmin@gmail.com",
        "password": "12345678"
    }

2. Admin
    - Email: admin@mail.com
    - Password: admin123
    - Access Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NGQ5ZDA2ZmRlNTEzMWIyMTE5MWM1NCIsImVtYWlsIjoiYWRtaW5AbWFpbC5jb20iLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNzMzMTM5NzI1fQ.26kYEymn7KeQZGqwO18EFGepxs3yvV1Iiihfku6Y6Fg
    - Data:
    {
        "email": "admin@mail.com",
        "password": "admin123"
    }

----------------------------------
2. Sample Blog
    - Title: Sample Exercise
    - Content: Content 1
    - Author: Author 1
    - CreationDate: 
    - Comments: Comment 1
    - Data:
    {
        "title": "Title 1",
        "content": "Content 1",
        "author": "Author 1",
        "creationdate": "2024"
    }
----------------------------------

PORT=4000
MONGODB_STRING="mongodb+srv://admin:admin123@wdc028-b461.encgn.mongodb.net/Blog-App-API?retryWrites=true&w=majority&appName=WDC028-B461"
JWT_SECRET_KEY="BlogAppAPI"