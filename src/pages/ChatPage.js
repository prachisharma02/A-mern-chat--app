import { ChatState } from "../context/ChatProvider";
import { Box } from "@chakra-ui/layout";
import Chatbox from "../components/ChatBox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/authentication/miscellaneous/SideDrawer";

function ChatPage() {
  const { user } = ChatState();
  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {user && <MyChats />}
        {user && <Chatbox />}
      </Box>
    </div>
  );
}

export default ChatPage;
