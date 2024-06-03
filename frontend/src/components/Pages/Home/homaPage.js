import React from "react";
import ChatMainPage from "../ChatMainPage/chatMainPage";


const HomePage = () => {
    return (
        <>
            <header>

            </header>
            <main>
                <body className="h-100 bg-light">
                    <div className="h-100">
                        <div className="h-100" id="chat">
                                <ChatMainPage />
                            </div>
                        </div>
                </body>
            </main>
        </>
    );
};

export default HomePage;
