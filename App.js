import { StyleSheet, Text,Platform, View, TouchableOpacity, SafeAreaView,ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import Entypo from 'react-native-vector-icons/Entypo';
import EmojiSelector from 'react-native-emoji-selector';

export default function App() {
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      _id: 1,
      text: 'Hello developer',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'React Native',
        avatar: 'https://facebook.github.io/react/img/logo_og.png',
      },
    },
  ]);

  

  const toggleEmojiPicker = () => {
    setIsEmojiPickerOpen(!isEmojiPickerOpen);
  };

  const onEmojiSelected = (emoji) => {
    setIsEmojiPickerOpen(false);
    onSend([{ text: emoji,}]);
  };

  const onSend = (newMessages = []) => {
    const messagesWithUserData = newMessages.map(message => ({
      ...message,
      user: {
        _id: 2, // Assuming user ID is 1, replace it with the actual user ID if needed
      },
    }));
    setMessages(previousMessages => GiftedChat.append(previousMessages, messagesWithUserData));
  }
  function scrollToBottomComponent() {
    return (
      <View style={styles.bottomComponentContainer}>
        <MaterialCommunityIcons
          name="arrow-down-circle"
          color="#6646ee"
          size={RFPercentage(6)}
        />
      </View>
    );
  }

  function renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6646ee" />
      </View>
    );
  }

  const renderActions = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Entypo
          name="emoji-happy"
          size={30}
          color="#000"
          style={{ marginHorizontal: 10, marginVertical: 10 }}
          onPress={toggleEmojiPicker}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
     {isEmojiPickerOpen ? (
       <View style={{ ...StyleSheet.absoluteFill, marginTop: 70,
        marginBottom: 30,
        marginLeft: 10,
        marginRight: 10,}}>
       <TouchableOpacity style={StyleSheet.absoluteFill} onPress={toggleEmojiPicker} />
       <EmojiSelector
         showTabs={false}
         showSearchBar={true}
         showHistory={false}
         showSectionTitles={false}
         columns={6}
         onEmojiSelected={onEmojiSelected}
         visible={isEmojiPickerOpen}
       />
     </View>
      ) : (
        <GiftedChat
          renderActions={renderActions}
          alwaysShowSend
          onInputTextChanged={(para) => {
            console.log('onInputTextChanged', para)
          }}
          textInputProps={{
            //keyboardType: Platform.OS == 'ios' ? "ascii-capable": "visible-password"
          }}
          messages={messages}
          onSend={newMessages => onSend(newMessages)}
          user={{
            _id: 2,
          }}
          isTyping={true}
          loadEarlier={false}
          isLoadingEarlier={false}
          renderAvatarOnTop={true}
          renderUsernameOnMessage={false}
          keyboardShouldPersistTaps="never"
          scrollToBottomComponent={scrollToBottomComponent}
          renderLoading={renderLoading}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
