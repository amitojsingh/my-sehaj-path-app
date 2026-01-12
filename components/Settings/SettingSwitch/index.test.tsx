import React from 'react';
import { SettingSwitch } from './index';
import { render, screen, waitFor, fireEvent } from '@testing-library/react-native';
import { showErrorAlert } from '@utils';
import { useLocal } from '@hooks';

// Mock the hooks and utilities
jest.mock('@hooks', () => ({
  useLocal: jest.fn(),
}));

jest.mock('@utils', () => ({
  showErrorAlert: jest.fn(),
  trackEvent: jest.fn(),
}));

const mockUseLocal = useLocal as jest.MockedFunction<typeof useLocal>;
const mockShowErrorAlert = showErrorAlert as jest.MockedFunction<typeof showErrorAlert>;

describe('SettingSwitch', () => {
  const defaultProps = {
    settingKey: 'paragraphMode',
    label: 'Paragraph Mode',
    value: false,
    errorMessage: 'Failed to save paragraph mode',
  };
  const mockSaveSettings = jest.fn();
  const mockFetchSettings = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseLocal.mockReturnValue({
      saveSettings: mockSaveSettings,
      fetchSettings: mockFetchSettings,
      fetchFromLocal: jest.fn(),
      handleNewPath: jest.fn(),
      handleUpdatePath: jest.fn(),
      handleUpdatePathWithErrorHandling: jest.fn(),
      saveFontSize: jest.fn(),
      fetchFontSize: jest.fn(),
      saveLarivaar: jest.fn(),
      fetchLarivaar: jest.fn(),
      renamePath: jest.fn(),
      saveAngsFormat: jest.fn(),
      fetchAngsFormat: jest.fn(),
      saveConsent: jest.fn(),
      fetchConsent: jest.fn(),
    });
  });

  describe('Rendering and Accessibility', () => {
    it('should render', () => {
      render(<SettingSwitch {...defaultProps} />);
      expect(screen.getByText('Paragraph Mode')).toBeTruthy();
      expect(screen.getByRole('switch')).toBeTruthy();
    });

    it('should render with correct initial value', () => {
      render(<SettingSwitch {...defaultProps} value={true} />);

      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeTruthy();
    });

    it('should display correct accessibility attributes', () => {
      render(<SettingSwitch {...defaultProps} />);

      const switchElement = screen.getByRole('switch');
      expect(switchElement.props.accessibilityLabel).toBe('Paragraph Mode setting');
      expect(switchElement.props.accessibilityRole).toBe('switch');
      expect(switchElement.props.accessibilityState.checked).toBe(false);
    });
  });

  describe('Initial State Loading', () => {
    it('should fetch setting value from AsyncStorage on mount', async () => {
      mockFetchSettings.mockResolvedValue(true);
      render(<SettingSwitch {...defaultProps} />);

      await waitFor(
        () => {
          expect(mockFetchSettings).toHaveBeenCalledWith(
            'paragraphMode',
            'Failed to save paragraph mode'
          );
        },
        { timeout: 3000 }
      );
    });

    it('should set state to fetched value when available', async () => {
      mockFetchSettings.mockResolvedValue(true);
      render(<SettingSwitch {...defaultProps} value={false} />);

      await waitFor(() => {
        const switchElement = screen.getByRole('switch');
        expect(switchElement.props.accessibilityState.checked).toBe(true);
      });
    });

    it('should default to false when fetched value is null', async () => {
      mockFetchSettings.mockResolvedValue(null);
      render(<SettingSwitch {...defaultProps} value={false} />);

      await waitFor(() => {
        const switchElement = screen.getByRole('switch');
        expect(switchElement.props.accessibilityState.checked).toBe(false);
      });
    });

    it('should show error alert when fetch fails', async () => {
      const error = new Error('Fetch failed');
      mockFetchSettings.mockRejectedValue(error);
      render(<SettingSwitch {...defaultProps} />);

      await waitFor(() => {
        expect(mockShowErrorAlert).toHaveBeenCalledWith('Failed to save paragraph mode');
      });
    });
  });

  describe('User Interactions', () => {
    it('should call saveSettings when switch is toggled', async () => {
      mockFetchSettings.mockResolvedValue(false);
      mockSaveSettings.mockResolvedValue(undefined);
      render(<SettingSwitch {...defaultProps} />);

      await waitFor(() => {
        expect(mockFetchSettings).toHaveBeenCalled();
      });

      const switchElement = screen.getByRole('switch');
      fireEvent(switchElement, 'valueChange', true);

      // Also trigger onValueChange directly since that's what the component uses
      if (switchElement.props.onValueChange) {
        switchElement.props.onValueChange(true);
      }

      await waitFor(
        () => {
          expect(mockSaveSettings).toHaveBeenCalledWith(
            'paragraphMode',
            true,
            'Failed to save paragraph mode'
          );
        },
        { timeout: 3000 }
      );
    });

    it('should update state when switch is toggled', async () => {
      mockFetchSettings.mockResolvedValue(false);
      mockSaveSettings.mockResolvedValue(undefined);
      render(<SettingSwitch {...defaultProps} />);

      await waitFor(() => {
        expect(mockFetchSettings).toHaveBeenCalled();
      });

      const switchElement = screen.getByRole('switch');
      fireEvent(switchElement, 'valueChange', true);

      // Also trigger onValueChange directly since that's what the component uses
      if (switchElement.props.onValueChange) {
        switchElement.props.onValueChange(true);
      }

      await waitFor(() => {
        const updatedSwitchElement = screen.getByRole('switch');
        expect(updatedSwitchElement.props.accessibilityState.checked).toBe(true);
      });
    });

    it('should show error alert when save fails', async () => {
      mockFetchSettings.mockResolvedValue(false);
      const saveError = new Error('Save failed');
      mockSaveSettings.mockRejectedValue(saveError);
      render(<SettingSwitch {...defaultProps} />);

      await waitFor(() => {
        expect(mockFetchSettings).toHaveBeenCalled();
      });

      const switchElement = screen.getByRole('switch');
      fireEvent(switchElement, 'valueChange', true);

      // Also trigger onValueChange directly since that's what the component uses
      if (switchElement.props.onValueChange) {
        switchElement.props.onValueChange(true);
      }

      await waitFor(
        () => {
          expect(mockShowErrorAlert).toHaveBeenCalledWith('Failed to save paragraph mode');
        },
        { timeout: 3000 }
      );
    });
  });
});
