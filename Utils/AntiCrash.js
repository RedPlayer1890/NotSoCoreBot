module.exports = async function () {
    process.on('unhandledRejection', async (error, promise) => { 
        console.log("==============================================================");
        console.log(`Unhandled Rejection.`);
        console.log("----------------------------")
        console.log(`Error message: \n${error}`);
        console.log("----------------------------")
        console.log(`Error Stack: \n${error.stack}`);
        console.log("----------------------------")
        console.log(`Promise status: ${promise}`);
        console.log("==============================================================");
    });

    process.on('uncaughtException', async (error, promise) => {
        console.log("==============================================================");
        console.log(`Uncaught Exception.`);
        console.log("----------------------------")
        console.log(`Error message: \n${error}`);
        console.log("----------------------------")
        console.log(`Error Stack: \n${error.stack}`);
        console.log("----------------------------")
        console.log(`Promise status: ${promise}`);
        console.log("==============================================================");
    });
}