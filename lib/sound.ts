// Sound effects fully disabled across project
class SoundEffects {
  public isEnabled(): boolean {
    return false;
  }
  public toggle(): boolean {
    return false;
  }
  public setEnabled(): void {}
  public playClick(): void {}
  public playHover(): void {}
  public playSuccess(): void {}
  public playToggle(): void {}
  public playWhoosh(): void {}
}

export const sounds = new SoundEffects();
