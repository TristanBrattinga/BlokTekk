# Mix & Match

<img src="https://user-images.githubusercontent.com/96078643/231850286-572e7d24-beb2-4344-bf76-9eb99d9e85bf.jpg" width="850px">

## The concept 💭
I really wanted to chose a topic that spoke to me and that I found interesting. I wanted to make my matching app about music, so I decided to build it around finding concerts and festivals that suits your liking. On the [Concept](https://github.com/TristanBrattinga/bloktech/wiki/Concept) page you will find more information on how I established my concept.

## The feature ⚙️
The feature I chose to build for my matching application is registration. I chose this feature, because I was really interested in how this can be created. I also thought this would give me a little bit of a challenge. When registrating for the matching application, it is possible to fill out the form in order to create your account. You can specify preferences, log in and delete your account.

## Pre-installation :wrench:
### Git (Windows)
Download and install [Git for Windows](https://gitforwindows.org/).
- Select your own preferred editor (in my case Visual Studio Code).
- Make sure you override the default branch name for new repositories. If you choose 'main' as default branch name, this will align with the default used on GitHub.
- Finally select 'Git from the command line', so you can use Git commands in PowerShell.

>Make sure you have git connected to your own github. Do this within your `commandline` like so:
[Connect Github to git](https://docs.github.com/en/authentication/connecting-to-github-with-ssh).

### Node.js
Download and install [Node.js](https://nodejs.org/en).
- Make sure you download the LTS version(currently 18.16.0). This is the version that has the longest support.
- When installing make sure you select the `npm package manager` and not the default of `Node.js runtime`.

When you have done these steps, you can check if git, node and npm are correctly installed and have the right version. Run these commands in your terminal:
```
git -v 
node -v 
npm -v 
```

### MongoDB
Before you are able to use the Mix&Match application, you have to connect to a database. In my case I used MongoDB. Create a [MongoDB Cloud](https://www.mongodb.com/cloud) account. From here follow the steps on the [MongoDB Guides page](https://www.mongodb.com/docs/guides/atlas/account/). Here is a small summary of the steps:
```
1. Create MongoDB account
2. Create a cluster
3. Add a database user
4. Configure a network connection
5. Load sample data
6. Get connection string
```

When you create your Cluster in Atlas you might need to Whitelist your IP.

### When you have followed all these steps you can begin to install the Mix&Match application!

***

## Installation :hammer:
Clone this repository to your own device
```
git clone https://github.com/TristanBrattinga/bloktech.git
```
When you have installed all the prerequisites, navigate to the project directory:
```
cd <path>/<path>/bloktech
```
Now install the required `dependencies` & `devDependencies` by running the following command:
```
npm install
```
Create a .env file and store sensitive information such as your database URI, password and username in this file .env using the [dotenv](https://www.npmjs.com/package/dotenv) package. 

>This should already be installed if you ran the command `npm install`.

My .env file looks like this: 

```
PORT='<port which the server is hosted on>'
DB_USERNAME='<database username>'
DB_PASSWORD='<database passpowrd>'
DB_URI='<database uri string>'
DB_NAME='<database name>'
DB_COLLECTION_1='<collection name>'
DB_COLLECTION_2='<collection name>'
```

>Make sure you add the .env file to your .gitignore.

>Also include your node_modules folder in your .gitignore file.

## Run :runner:
To start the application I have made some `npm run scripts`. These make it easier to work with your application.

To start the application in normal mode, run:
```
npm start
```

To start the application in dev mode, run this command:
```
npm run devStart
```

After starting the application, open your browser and navigate to:

```
localhost:8080
```


### Thank you for reading this README file and checking out my application. I hope you enjoyed! 

## Wiki 📖
In the [Wiki](https://github.com/TristanBrattinga/bloktech/wiki) you can find all the information about this project and the matching application I have built.

## Sources :arrow_heading_down:
- [NPM](https://www.npmjs.com/)
- [freeCodeCamp](https://www.freecodecamp.org/news/how-to-write-a-good-readme-file/)
- [pt-course-22-23 repo](https://github.com/cmda-bt/pt-course-22-23)
- [be-course-22-23 repo](https://github.com/cmda-bt/be-course-22-23)
- [fe-course-22-23 repo](https://github.com/cmda-bt/fe-course-22-23)
- [MongoDB](https://www.mongodb.com/)
- [Node.js](https://nodejs.org/en)
- [Git for Windows](https://gitforwindows.org/)
- [SSH key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
- [ChatGPT](https://openai.com/blog/chatgpt)
- [License](https://gist.github.com/nicolasdao/a7adda51f2f185e8d2700e1573d8a633)
- [Github markdown cheat sheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
- [Github emoji cheat sheet](https://gist.github.com/rxaviers/7360908)


## License :mag:
[MIT](https://github.com/TristanBrattinga/bloktech/blob/main/LICENSE.md)      
        
*Disclaimer: All of the code and documentation found in this repository is written by myself or quoted.*
