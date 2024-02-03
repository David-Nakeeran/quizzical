import { useEffect } from "react"


export default function Quiz() {

    useEffect(() => {
        console.log('effect ran');
        const abortController = new AbortController();

        async function getData() {
            try {
                const res = await fetch('https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple');

                if(!res.ok) {
                    throw Error(res.status)
                }
                const data = await res.json();

                console.log(data);
            }   catch(error) {
                console.error(error);
            };   
        };
        getData()
        return () => abortController.abort();
    }, []);
        
    return (
        <div className="quiz-container">
            Test
        </div>
    )
}