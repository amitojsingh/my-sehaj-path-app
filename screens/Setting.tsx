import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavContent, SimpleText, FontSize, Angs } from '@components';
import { GoBackIcon } from '@icons';
import { SettingScreenStyle, SafeAreaStyle } from '@styles';
import { RootStackParamList } from '../App';
import { Constants } from '@constants';
import { SettingSwitch } from '@components';
import { BaniOptionsSettingsArray } from '@constants';

type SettingProps = NativeStackScreenProps<RootStackParamList, 'Setting'>;

export const Settings = ({ navigation }: SettingProps) => {
  return (
    <SafeAreaView style={SafeAreaStyle.safeAreaView}>
      <View style={SettingScreenStyle.container}>
        <View style={SettingScreenStyle.navContainer}>
          <NavContent navIcon={<GoBackIcon />} onPress={() => navigation.goBack()} />
          <NavContent text={Constants.SETTINGS} />
        </View>
        <View style={SettingScreenStyle.settingContainer}>
          <View>
            <View>
              <SimpleText simpleText={Constants.DISPLAY_OPTIONS} />
            </View>
            <FontSize />
            <Angs />
          </View>
          <View>
            <View>
              <SimpleText simpleText={Constants.BANI_OPTIONS} />
            </View>
            {BaniOptionsSettingsArray.map((setting) => (
              <SettingSwitch
                settingKey={setting.settingKey}
                label={setting.label}
                value={setting.value}
                errorMessage={setting.errorMessage}
              />
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
