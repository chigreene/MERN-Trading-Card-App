import gitHubMark from "../assets/github-mark.png";
import "./footer.css";

function Footer() {
  return (
    <div className="footerBody">
      <div className="nameContainer">
        <a
          href="https://github.com/BeginnerLevelUP"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>Damion Morgan</p>
        </a>
        <a
          href="https://github.com/chigreene"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>Chris Greene</p>
        </a>
      </div>

      <a
        href="https://github.com/chigreene/MERN-Trading-Card-App"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={gitHubMark}
          alt="GitHub Mark"
          style={{ width: "50px", height: "50px", margin: "20px" }}
        />
      </a>
      <div className="nameContainer">
        <a
          href="https://github.com/Caphtori"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>Benji Shuter</p>
        </a>
        <a
          href="https://github.com/erhanbelanger"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>Erhan Belenger</p>
        </a>
      </div>
    </div>
  );
}

export default Footer;
