import React from "react";
import './Slideshow.css';
import RecImgs from "../../JSON files/RecipeImages.json";

function Slideshow(props) {
    const [index, setIndex] = React.useState(0);
    const timeoutRef = React.useRef(null);
    //const carImgs = ["https://images.pexels.com/photos/34153/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350", "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"];
    const bufferArr = [];
    const carImgs = [];
    const delay = 2500;

    var inde = props.lower;
    while(inde < props.upper){
        bufferArr.push(RecImgs[inde]);
        inde++;
    }

    if(carImgs.length < 3){
        carImgs.push(bufferArr[props.ind1]);
        carImgs.push(bufferArr[props.ind2]);
        carImgs.push(bufferArr[props.ind3]);
    }

    function resetTimeout() {
        if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        }
    }

    React.useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
        () =>
            setIndex((prevIndex) =>
            prevIndex === carImgs.length - 1 ? 0 : prevIndex + 1
            ),
        delay
        );

        return () => {
        resetTimeout();
        };
    }, [index]);

    return (
        <div className="slideshow">
        <div
            className="slideshowSlider"
            style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
        >
            {carImgs.map((bg, index) => (
            <div
                className="slide"
                key={index}
                //style={imgStyl}
                style={{backgroundImage: "url(" + bg + ")"}}
            ></div>
            ))}
        </div>

        <div className="slideshowDots">
            {carImgs.map((_, idx) => (
            <div
                key={idx}
                className={`slideshowDot${index === idx ? " active" : ""}`}
                onClick={() => {
                setIndex(idx);
                }}
            ></div>
            ))}
        </div>
        </div>
    );
}

export default Slideshow;