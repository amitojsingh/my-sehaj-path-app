import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Switch } from '@rneui/themed';
import { SimpleText } from '@components';
import { BaniOptionsSettings } from '@types';
import { SettingSwitchStyles } from '@styles';
import { useLocal } from '@hooks';
import { showErrorAlert, trackEvent } from '@utils';

export const SettingSwitch = ({ settingKey, label, value, errorMessage }: BaniOptionsSettings) => {
  const [isSetting, setIsSetting] = useState<boolean>(value);
  const { container, fontSizeText } = SettingSwitchStyles;
  const { saveSettings, fetchSettings } = useLocal();

  useEffect(() => {
    const fetchFromLocal = async () => {
      try {
        const setting = await fetchSettings(settingKey, errorMessage);
        setIsSetting(setting || false);
      } catch (error) {
        showErrorAlert(errorMessage);
      }
    };
    fetchFromLocal();
  }, [fetchSettings, settingKey, errorMessage]);

  const handleSettingChange = async (setting: boolean) => {
    try {
      setIsSetting(setting);
      trackEvent('Settings', 'click', `changed ${label} to ${setting ? 'enabled' : 'disabled'}`);
      await saveSettings(settingKey, setting, errorMessage);
    } catch (error) {
      showErrorAlert(errorMessage);
    }
  };

  return (
    <View style={container}>
      <SimpleText simpleText={label} simpleTextStyle={fontSizeText} />
      <Switch
        value={isSetting}
        onValueChange={handleSettingChange}
        trackColor={{
          false: 'rgb(194, 194, 194)',
          true: 'rgba(17, 51, 106, 0.46)',
        }}
        thumbColor={isSetting ? 'rgb(17, 51, 106)' : 'rgb(142, 142, 142)'}
        accessibilityLabel={`${label} setting`}
        accessibilityRole="switch"
        accessibilityHint={`Tap to ${isSetting ? 'disable' : 'enable'} ${label} mode`}
        accessibilityState={{ checked: isSetting }}
      />
    </View>
  );
};
