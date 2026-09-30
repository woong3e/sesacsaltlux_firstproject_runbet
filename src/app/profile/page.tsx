import { BottomNavigation } from "@/components/layout/bottom-navigation";
import { MobileScreen } from "@/components/layout/mobile-screen";

export default function ProfilePage() {
  return (
    <MobileScreen>
      <main aria-label="프로필" className="flex-1" />
      <BottomNavigation />
    </MobileScreen>
  );
}
