# Web Development Final Project - *CampusHub*

Submitted by: **Ya Ji**

This web app: **is a social platform for university students to share course reviews, trade items, and engage in campus discussions. With features for image uploads, comments, and upvotes, it creates a comprehensive ecosystem for students. The intuitive interface organizes content into Course Reviews, Marketplace, and General Discussions, making it easy to find relevant information and connect with peers across campus.**

Time spent: **5** hours spent in total

## Required Features

The following **required** functionality is completed:


- [x] **Web app includes a create form that allows the user to create posts**
    - Form requires users to add a post title
    - Forms should have the *option* for users to add:
        - additional textual content
        - an image added as an external image URL
- [x] **Web app includes a home feed displaying previously created posts**
    - Web app must include home feed displaying previously created posts
    - By default, each post on the posts feed should show only the post's:
        - creation time
        - title
        - upvotes count
    - Clicking on a post should direct the user to a new page for the selected post
- [x] **Users can view posts in different ways**
    - Users can sort posts by either:
        -  creation time
        -  upvotes count
    - Users can search for posts by title
- [x] **Users can interact with each post in different ways**
    - The app includes a separate post page for each created post when clicked, where any additional information is shown, including:
        - content
        - image
        - comments
    - Users can leave comments underneath a post on the post page
    - Each post includes an upvote button on the post page.
        - Each click increases the post's upvotes count by one
        - Users can upvote any post any number of times

- [x] **A post that a user previously created can be edited or deleted from its post pages**
    - After a user creates a new post, they can go back and edit the post
    - A previously created post can be deleted from its post page

The following **optional** features are implemented:


- [ ] Web app implements pseudo-authentication
    - Users can only edit and delete posts or delete comments by entering the secret key, which is set by the user during post creation
    - **or** upon launching the web app, the user is assigned a random user ID. It will be associated with all posts and comments that they make and displayed on them
    - For both options, only the original user author of a post can update or delete it
- [ ] Users can repost a previous post by referencing its post ID. On the post page of the new post
    - Users can repost a previous post by referencing its post ID
    - On the post page of the new post, the referenced post is displayed and linked, creating a thread
- [ ] Users can customize the interface
    - e.g., selecting the color scheme or showing the content and image of each post on the home feed
- [ ] Users can add more characterics to their posts
    - Users can share and view web videos
    - Users can set flags such as "Question" or "Opinion" while creating a post
    - Users can filter posts by flags on the home feed
    - Users can upload images directly from their local machine as an image file
- [ ] Web app displays a loading animation whenever data is being fetched

The following **additional** features are implemented:

* [ ] List anything else that you added to improve the site's functionality!

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='https://private-user-images.githubusercontent.com/181181004/438051020-ee98de67-5ad5-46ef-acdc-66fdcb6587fd.gif?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDU4MTgzODQsIm5iZiI6MTc0NTgxODA4NCwicGF0aCI6Ii8xODExODEwMDQvNDM4MDUxMDIwLWVlOThkZTY3LTVhZDUtNDZlZi1hY2RjLTY2ZmRjYjY1ODdmZC5naWY_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwNDI4JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDQyOFQwNTI4MDRaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0wMjc2OGI5NDdiODdhMTU0ZDc1NDIyODY2NTY3MDc0ZjY2MGIzZWQ2NmFmOGM0NDljOTExMzkwNTQ0YjI1YmZmJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9._yyTwzq5eHXYpvsLvzHFy--UQhpiCvJ9ZH8FZgs2buA' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with LiceCap
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

Describe any challenges encountered while building the app.

## License

    Copyright [Ya Ji] [name of copyright owner]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.