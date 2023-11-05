import './../App.scss';
export default function NotFound() {

    if (window.location.pathname === "/*") {
        return null;
    }

    return (
        <div className="not_found">
            <div className="txt">
                <h1>
                    <strong>
                        Woops!
                    </strong> 이곳이 아닌가봐요!</h1>
                <p>
                    주소를 다시 확인해보세요!<br/>
                    새로운 길을 다시 찾을 수 있을거에요! &#128077;
                </p>
            </div>
        </div>
    );
}
