
import Image from "next/image";
import Activity from "./activity.svgr"
import avatar from "./avatar.svg?url"
const Header = () => {
  return (
    <div>
      <Activity width={180}
        height={38}></Activity>
      <Image
        className="dark:invert"
        src={avatar}
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      />
    </div>
  )
}

export default Header