import React, { useContext } from "react";
import { Icon } from "react-icons-kit";
import { ic_apps } from "react-icons-kit/md/ic_apps";
import { ic_chat_bubble } from "react-icons-kit/md/ic_chat_bubble";
import { ic_menu } from "react-icons-kit/md/ic_menu";
import { ic_notifications } from "react-icons-kit/md/ic_notifications";
import { ic_search } from "react-icons-kit/md/ic_search";
import { ic_video_call } from "react-icons-kit/md/ic_video_call";

import { BackgroundContext, Contrast } from "../../huet";
import { rule } from "../../private/nano";
import YouTubeLogo from "../YouTubeLogo";

const clamp2Lines = rule({
  display: "-webkit-box",
  WebkitLineClamp: "2",
  overflow: "hidden",
  WebkitBoxOrient: "vertical"
});

export default function YouTube() {
  return (
    <div>
      <Header />
      <div className="ph3 pt3 flex flex-wrap flex-nowrap-l">
        <div className="w-100 w-80-l mr3-l mb3">
          <Contrast
            bg={20}
            className="w-100"
            style={{
              paddingTop: "55%"
              // backgroundImage: `url(https://i.ytimg.com/vi/yZYQpge1W5s/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLDA_mgzrfRkeD0rYMpeyfrYhysr_w)`,
              // backgroundSize: "cover"
            }}
          />
          <Contrast className="f4 mv3 db">
            Dan Abramov: Beyond React 16 | JSConf Iceland 2018
          </Contrast>
          <Contrast text={50} className="mv3 db">
            46,841 views
          </Contrast>
          <Contrast border={10} className="bt mv3" />
          <div className="flex justify-between">
            <Contrast text={100} textRamp="blue">
              https://2018.jsconf.is/speakers/dan-a...
            </Contrast>
            <Contrast
              as="button"
              bg={100}
              bgRamp="red"
              textRamp="white"
              className="pv2 ph3 f6 br1 bn"
            >
              <b>SUBSCRIBE</b> 108K
            </Contrast>
          </div>
          <div className="flex items-center mb3">
            <Contrast>23 Comments</Contrast>{" "}
            {/* <Icon name="sort" size="1.5em" contrast={60} className="ml4 mr1" />{" "} */}
            <Contrast text={60} className="f7">
              SORT BY
            </Contrast>
          </div>
          <div className="flex items-center">
            <Contrast bg={60} className="w2 h2 br-100 mr2" />{" "}
            <Contrast text={60} border={10} className="bb pb1 f6 flex-auto">
              Add a public comment
            </Contrast>
          </div>
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
        </div>
        <Sidebar />
      </div>
    </div>
  );
}

function Header({ className, style }) {
  const parentBg = useContext(BackgroundContext);
  return (
    <Contrast
      bg={5}
      className={`pa3 flex justify-between ${className}`}
      style={{
        boxShadow: `0 0 10px ${parentBg.shadowColor(0.3)}`,
        position: "sticky",
        top: 0,
        zIndex: 1,
        ...style
      }}
    >
      <div className="flex items-center">
        <Icon icon={ic_menu} size="1.5em" className="mr3" />
        <YouTubeLogo style={{ height: "1.5em" }} />
      </div>
      <div className="flex-ns w-40 dn flex-auto-m mh4">
        <SearchInput />
        <Contrast as="button" bg={6} border={15} className="flex ph3 bt bb br">
          <Contrast text={50}>
            <Icon icon={ic_search} size="1.2em" />
          </Contrast>
        </Contrast>
      </div>
      <div className="flex flex-none items-center">
        <Contrast text={50} className="flex flex-none items-center">
          <Icon icon={ic_video_call} size="1.5em" className="mr3" />
          <Icon icon={ic_apps} size="1.5em" className="mr3" />
          <Icon icon={ic_chat_bubble} size="1.2em" className="mr3" />
          <Icon icon={ic_notifications} size="1.5em" className="mr3" />
        </Contrast>
        <Contrast
          bg={40}
          className={`w2 h2 br-100 ${className}`}
          style={style}
        />
      </div>
    </Contrast>
  );
}

function Comment() {
  return (
    <div className="flex items-center mt3">
      <Contrast bg={60} className="w2 h2 br-100 mr2" />{" "}
      <Contrast text={60} className="pb1 f6 flex-auto">
        Lorem...
      </Contrast>
    </div>
  );
}

function SearchInput() {
  const parentBg = useContext(BackgroundContext);
  const bgColor = parentBg.contrast(5);
  return (
    <input
      className={`ba ph1 flex-auto ${rule({
        // TODO: prevent this from creating extra classes that aren't necessary
        "::placeholder": {
          opacity: 1, // For Firefox
          color: bgColor.contrast(20).toString()
        }
      })}`}
      placeholder="Search"
      style={{
        backgroundColor: bgColor,
        borderColor: parentBg.contrast(15),
        color: bgColor.contrast(100),
        boxShadow: `inset 0 2px 6px ${parentBg.shadowColor(0.1)}`
      }}
    />
  );
}

function Sidebar() {
  const parentBg = useContext(BackgroundContext);
  return (
    <div>
      <div className="flex justify-between mb3">
        <b>Up next</b>
        <b className="flex items-center">
          <Contrast text={40} className="f7 mr1">
            AUTOPLAY
          </Contrast>
          <Contrast
            bg={15}
            className="br-pill relative"
            style={{
              width: "2.4em",
              height: "1em"
            }}
          >
            <Contrast
              bg={100}
              bgRamp="blue"
              className="br-pill"
              style={{
                width: "1.3em",
                height: "1.3em",
                position: "absolute",
                top: "50%",
                transform: "translate(85%,-50%)",
                boxShadow: `0px 2px 4px ${parentBg.shadowColor(0.3)}`
              }}
            />
          </Contrast>
        </b>
      </div>
      <VideoPreview />
      <Contrast border={10} className="bt mv3" />
      <VideoPreview className="mb2" />
      <VideoPreview className="mb2" />
      <VideoPreview className="mb2" />
      <VideoPreview className="mb2" />
      <VideoPreview className="mb2" />
      <VideoPreview className="mb2" />
    </div>
  );
}

function VideoPreview({ className, style }) {
  return (
    <div className={`flex items-start ${className}`} style={style}>
      <Contrast
        bg={20}
        className="mr2"
        style={{
          flexShrink: 0,
          width: "8em",
          height: "5em"
          // backgroundImage: `url(https://i.ytimg.com/vi/yZYQpge1W5s/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLDA_mgzrfRkeD0rYMpeyfrYhysr_w)`,
          // backgroundSize: "cover"
        }}
      />
      <div className="flex flex-column">
        <Contrast className={`f6 b mb1 mw6 ${clamp2Lines}`}>
          Why Everything You Thought You Knew About Quantum Physics is Different
          - with Philip Ball
        </Contrast>
        <Contrast text={60} className="f7 mb1">
          The Royal Institution
        </Contrast>
        <Contrast text={60} className="f7">
          358K views
        </Contrast>
      </div>
    </div>
  );
}
