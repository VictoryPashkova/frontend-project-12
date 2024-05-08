import React from "react";
import ChatMainPage from "../ChatMainPage/chatMainPage";


const HomePage = () => {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                <body>
                    <ChatMainPage />
                </body>
            </main>
        </>
    );
};

export default HomePage;
