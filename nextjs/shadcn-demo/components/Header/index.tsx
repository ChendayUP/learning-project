
import Image from "next/image";
import Activity from "./activity.svgr"
import avatar from "./avatar.svg?url"
import soy2 from "@/assets/imgs/soybean.jpg"
const soy = "/soybean.jpg"
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
      <Image
        className="dark:invert"
        src={soy}
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      />
      <Image
        className="dark:invert"
        src={soy2}
        alt="Next.js logo"
        width={90}
        height={19}
        priority
      />
    </div>
  )
}

export default Header