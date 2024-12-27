import React from 'react';

const About = () => {
    return (
        <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-teal-100 min-h-[80vh] md:w-[35%]">
            <h1 className="text-3xl font-bold text-center">About</h1>
            <p className="mt-4 text-lg">
                This To-Do List application allows you to plan your day effectively.
                You can add tasks, mark them as complete, edit, and delete them.
                Built with <strong>React</strong>, this app saves your tasks locally
                in the browser using <strong>localStorage</strong>, ensuring your
                data persists even after refreshing the page.
            </p>
            <p className="mt-4 text-lg">
                Use the navigation bar to explore different pages. Happy planning!
            </p>
            <p className="mt-4 text-lg">
                <strong>Name -</strong> Rahul
            </p>
            <p className="mt-4 text-lg">
                <strong>Bupin - </strong>23UCS087
            </p>
            <p className="mt-4 text-lg">
                <strong>Email - </strong>Rahul717321@gmail.com
            </p>
        </div>
    );
};

export default About;
