import { useEffect } from "react";
import "./slot-text.css";

const SlotText = () => {
    const wordList = ["DevBot.", "BizBot.", "DesignBot."];
    

    const animate = () => {
        let textHolder = document.getElementById("scroll-text-holder");
        if (textHolder) {
            if (textHolder.scrollTop < 200) {
                textHolder.scrollTop += 140;
            } else {
                textHolder.scrollTop = 0;
            }

        }
        
    };

    useEffect(() => {
        let textHolder = document.getElementById("scroll-text-holder");
        textHolder.scrollTop = 0;
        setTimeout(() => {
            setInterval(animate, 2000);
        }, 1000)
    })


    return(
        <div className="text-holder" id="scroll-text-holder">
            {wordList.map((word, idx) => {
                return(
                    <span key={idx} className="main-text">{word}</span>
                );
                
            })}
        </div> 
    );
}

export default SlotText;