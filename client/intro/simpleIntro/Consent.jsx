import React from "react";

import { Centered, ConsentButton } from "meteor/empirica:core";
import BrowserDetection from "react-browser-detection";
import Buttom from "./Buttom";

export default class Consent extends React.Component {
  static renderConsent() {
    // console.log("this is not firefox");
    return (
        <Centered>
          <div className="consent bp3-ui-text">
            <h2 className="bp3-heading" style={{ textAlign: "center" }}>
              {" "}
              实验知情同意书{" "}
            </h2>
            <div className="consent-con">
              <p>您好，非常感谢您能够抽时间参与本实验。请详细阅读以下说明：</p>
              <h4 className="bp3-heading">实验介绍：</h4>
              <p>
                &emsp;&emsp;本实验旨在了解影响团体任务协作绩效的相关因素。在实验过程中，您会遇到一系列问题，需要您和团队另外
                <em style={{ color: "red" }}>
                  <strong> 2 </strong>
                </em>
                位成员共同协作解决问题。
                实验内容不会对您的心理和生理产生任何不良影响。实验预计耗时
                <em style={{ color: "red" }}>
                  <strong> 30 </strong>
                </em>
                分钟。如果您现在没有充足的空余时间来完成本次实验，您可以关闭本页面并在下次参加。
              </p>
              <h4 className="bp3-heading">虚拟报酬：</h4>
              <p>
                &emsp;&emsp;您在游戏中的表现将会转化为分数和金币的形式，并在最后进行公布。
              </p>

              <h4 className="bp3-heading">信息收集：</h4>
              <p>
                &emsp;&emsp;我们将记录并保存您在实验过程中的动作（如鼠标点击）、成员间的沟通内容等
                以及收集您的年龄、性别等个人信息。我们收集的以上信息仅用于学术研究，
                您的所有个人资料和实验结果我们都将严格保密，不会外传，
                且您的个人信息不会出现在最终的研究结果中。
              </p>

              <h4 className="bp3-heading">注意事项：</h4>
              <p>
                &emsp;&emsp;为了更好的游戏体验，请在电脑上使用
                <em style={{ color: "red" }}>
                  <strong> 谷歌浏览器 </strong>
                </em>
                运行本游戏，使用其他浏览器可能会破坏您和您潜在的队友的游戏体验!
                并且请通过“Ctrl+滚轮”尽可能的调整网页至合适大小。
              </p>
              <p>
                &emsp;&emsp;如果您同意参加本次实验，请点击“我同意”（确保自己有充足的时间）。若您不同意参加本次实验，可以直接退出，感谢您的阅读~
              </p>
            </div>
            {/* <div style={{ textAlign: "center" }}> */}
            <div style={{ textAlign: "center" }}>
              <p></p>
              <ConsentButton style={{ textAlign: "center" }} text="我同意" />
            </div>
          </div>
        </Centered>
    );
  }

  renderNoFirefox = () => {
    // console.log("this is fire fox");
    return (
      <div className="consent">
        <h1
          className="bp3-heading"
          style={{ textAlign: "center", color: "red" }}
        >
          请勿使用火狐浏览器!!
        </h1>
        <p style={{ textAlign: "center" }}>
          请不要使用火狐浏览器!这会破坏您和您潜在的队友的游戏体验!
        </p>
      </div>
    );
  };

  render() {
    // const { treatment } = this.props;
    const browserHandler = {
      default: (browser) =>
        browser === "firefox"
          ? this.renderNoFirefox()
          : Consent.renderConsent(),
    };

    return (
      <Centered>
        <BrowserDetection>{browserHandler}</BrowserDetection>
      </Centered>
    );
  }
}

// import React from "react";

// import { Centered, ConsentButton } from "meteor/empirica:core";
// import BrowserDetection from "react-browser-detection";

// export default class Consent extends React.Component {
//   static renderConsent() {
//     console.log("this is not firefox");
//     return (
//       <Centered>
//         <div className="consent bp3-ui-text">
//           <h2 className="bp3-heading"> Microsoft Research Project Participation Consent Form </h2>
//           <p>
//             This research project has been reviewed and approved by the
//             Microsoft Research Ethics Advisory Board.
//           </p>
//           <h5 className="bp3-heading">INTRODUCTION</h5>
//           <p>
//             Thank you for deciding to volunteer in a Microsoft Corporation
//             research project. The purpose of this project is to understand how
//             individuals and groups solve complex problems. You have no
//             obligation to participate and you may decide to terminate your
//             participation at any time. You also understand that the researcher
//             has the right to withdraw you from participation in the project at
//             any time. Below is a description of the research project, and your
//             consent to participate. Read this information carefully. If you
//             agree to participate, click "I agree" to indicate that you have read
//             and understood the information provided on this consent form.
//           </p>
//           <h5 className="bp3-heading">TITLE OF RESEARCH PROJECT</h5>
//           <p>Solving Problems of Dorm Room Assignment</p>

//           <h5 className="bp3-heading">PROCEDURES</h5>
//           <p>
//             During this project, you will be presented with a series of problems
//             to solve, either on your own or in a team of three. Microsoft will
//             document and collect information about your participation by
//             recording your actions (e.g. mouse clicks) and any text responses
//             you issue.
//           </p>

//           <h5 className="bp3-heading">PERSONAL INFORMATION</h5>
//           <p>
//             <strong>Personal information we collect.</strong> During the project
//             we may collect personal information about you such as your age and
//             gender.
//           </p>
//           <p>
//             <strong>How we use personal information.</strong> The personal
//             information and other data collected during this project will be
//             used primarily to perform research for purposes described in the
//             introduction above. Such information and data, or the results of the
//             research may eventually be used to develop and improve our
//             commercial products, services or technologies. Short excerpts of
//             de-identified information may be used in academic and commercial
//             publications about this research: any information so used will not
//             be able to be deleted.
//           </p>
//           <p>
//             <strong>How we store and share your personal information.</strong>{" "}
//             Your name and other personal information will be kept separate from
//             the other information you give, and these two things will be stored
//             in different places. Your personal data will stored for a period of
//             up to 18 months Except as otherwise described in this document,
//             personal information you provide during this project will not be
//             shared outside of Microsoft and its subsidiaries and affiliates
//             without your permission. De-identified research results may be
//             shared with other investigators without additional consent.{" "}
//           </p>
//           <p>
//             How you can access and control your personal information. If you
//             wish to review or copy any personal information you provided during
//             the study, or if you want us to delete or correct any such data,
//             email your request to the research team at: [specify contact email
//             or alias]. If you have a privacy concern, complaint, or a question
//             for the Chief Privacy Officer/Data Protection Officer of Microsoft,
//             please contact us by using our Web form{" "}
//             <a href="https://go.microsoft.com/fwlink/?LinkId=321116">
//               https://go.microsoft.com/fwlink/?LinkId=321116
//             </a>
//             . We will respond to questions or concerns within 30 days.For
//             additional information on how Microsoft handles your personal
//             information, please see the
//             <a href="https://privacy.microsoft.com/en-us/privacystatement">
//               Microsoft Privacy Statement
//             </a>
//             .
//           </p>

//           <h5 className="bp3-heading">RESEARCH RESULTS & FEEDBACK</h5>
//           <p>
//             Microsoft will own all of the research data and analysis and other
//             results (collectively “Research Results”) generated from the
//             information you provide and your participation in the research
//             project. You may also provide suggestions, comments or other
//             feedback (“Feedback”) to Microsoft with respect to the research
//             project. Feedback is entirely voluntary, and Microsoft shall be free
//             to use, disclose, reproduce, license, or otherwise distribute, and
//             leverage the Feedback and Research Results.
//           </p>

//           <h5 className="bp3-heading">CONFIDENTIALITY</h5>
//           <p>
//             The research project and information you learn by participating in
//             the project is confidential to Microsoft. Accordingly, you agree to
//             keep it secret as you would your own confidential information and
//             never disclose it to anyone else (unless you are required to do
//             under judicial or other governmental order). However, you do not
//             need to keep secret specific information that is general public
//             knowledge or that you legally receive from another source that is
//             not affiliated with Microsoft so long as that source was entitled to
//             share the information with you and did not obligate you to keep it a
//             secret. You agree not to disclose to Microsoft any non-public
//             information, whether yours or a third party’s without notifying
//             Microsoft in advance.
//           </p>

//           <h5 className="bp3-heading">Benefits and Risks</h5>
//           <p>
//             <strong>Benefits:</strong> The research team expects to learn about
//             how humans solve complex problems from this project which we hope
//             will result in one or more academic publications. You will receive
//             payment after completing this session as well as any public benefit
//             that may come these Research Results being shared with the greater
//             scientific community.{" "}
//           </p>
//           <p>
//             <strong>Risks: </strong> During your participation, you may
//             experience frustration if you are unable to solve a particular
//             problem. To help reduce such risks, research team has generated
//             problems of different difficulty levels.
//           </p>

//           <p>
//             <strong>
//               You accept the risks described above and whatever consequences may
//               come of those risks, however unlikely, unless caused by our
//               negligence or intentional misconduct. You hereby release Microsoft
//               and its affiliates from any claim you may have now or in the
//               future arising from such risks or consequences. In addition, you
//               agree that Microsoft will not be liable for any loss, damages or
//               injuries that may come of improper use of the study prototype,
//               equipment, facilities, or any other deviations from the
//               instructions provided by the research team. Don’t participate in
//               this study if you feel you may not be able to safely participate
//               in any way including due to any physical or mental illness,
//               condition or limitation. You agree to immediately notify the
//               research team of any incident or issue or unanticipated risk or
//               incident.{" "}
//             </strong>
//           </p>

//           <h5 className="bp3-heading">YOUR AUTHORITY TO PARTICIPATE</h5>
//           <p>
//             You represent that you have the full right and authority to sign
//             this form, and if you are a minor that you have the consent (as
//             indicated below) of your legal guardian to sign and acknowledge this
//             form. By signing this form, you confirm that you understand the
//             purpose of the project and how it will be conducted and consent to
//             participate on the terms set forth above. Should you have any
//             questions concerning this project, please contact;
//             ssuri0@outlook.com. Please confirm your acceptance by signing the
//             bottom of this form. Upon request, a copy of this consent form will
//             be provided to you for your records. On behalf of Microsoft, we
//             thank you for your contribution and look forward to your research
//             session.
//           </p>

//           <p>
//             Thanks for taking time to read the consent form. If you do not want
//             to do this HIT, please return it.
//           </p>

//           <ConsentButton text="I AGREE" />
//         </div>
//       </Centered>
//     );
//   }

//   renderNoFirefox = () => {
//     console.log("this is fire fox");
//     return (
//       <div className="consent">
//         <h1 className="bp3-heading" style={{ textAlign: "center", color: "red" }}>
//           DO NOT USE FIREFOX!!
//         </h1>
//         <p style={{ textAlign: "center" }}>
//           Please, don't use firefox! It breaks our game and ruins the experience
//           for your potential teammates!
//         </p>
//       </div>
//     );
//   };

//   render() {
//     const browserHandler = {
//       default: browser =>
//         browser === "firefox" ? this.renderNoFirefox() : Consent.renderConsent()
//     };

//     return (
//       <Centered>
//         <BrowserDetection>{browserHandler}</BrowserDetection>
//       </Centered>
//     );
//   }
// }
