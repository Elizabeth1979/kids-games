import { describe, it, expect } from 'vitest';
import enTranslations from '../i18n/messages/en.json';
import heTranslations from '../i18n/messages/he.json';
import ruTranslations from '../i18n/messages/ru.json';
import arTranslations from '../i18n/messages/ar.json';

describe('Translation Emojis', () => {
  describe('English translations', () => {
    it('should have emojis in game titles on home page', () => {
      expect(enTranslations.games.titles['tic-tac-toe']).toContain('⭕');
      expect(enTranslations.games.titles['tic-tac-toe']).toContain('❌');
      expect(enTranslations.games.titles['canvas-drawing']).toContain('🎨');
      expect(enTranslations.games.titles['image-puzzle']).toContain('🧩');
      expect(enTranslations.games.titles['memory-game']).toContain('🧠');
    });

    it('should have emojis in Drawing game', () => {
      expect(enTranslations.games.drawing.title).toContain('🎨');
      expect(enTranslations.games.drawing.color).toContain('🎨');
      expect(enTranslations.games.drawing.size).toContain('📏');
      expect(enTranslations.games.drawing.clear).toContain('🗑️');
      expect(enTranslations.games.drawing.save).toContain('💾');
    });

    it('should have emojis in Tic-Tac-Toe game', () => {
      expect(enTranslations.ticTacToe.title).toContain('⭕');
      expect(enTranslations.ticTacToe.title).toContain('❌');
      expect(enTranslations.ticTacToe.yourTurn).toContain('🎯');
      expect(enTranslations.ticTacToe.computerTurn).toContain('🤖');
      expect(enTranslations.ticTacToe.youWin).toContain('🎉');
      expect(enTranslations.ticTacToe.computerWins).toContain('🤖');
      expect(enTranslations.ticTacToe.tie).toContain('🤝');
      expect(enTranslations.ticTacToe.newGame).toContain('🎮');
      expect(enTranslations.ticTacToe.resetScore).toContain('🔄');
      expect(enTranslations.ticTacToe.easy).toContain('😊');
      expect(enTranslations.ticTacToe.medium).toContain('🤔');
      expect(enTranslations.ticTacToe.hard).toContain('😤');
      expect(enTranslations.ticTacToe.scores.you).toContain('👤');
      expect(enTranslations.ticTacToe.scores.computer).toContain('🤖');
      expect(enTranslations.ticTacToe.scores.tie).toContain('🤝');
    });

    it('should have emojis in Image Puzzle game', () => {
      expect(enTranslations.games.puzzle.title).toContain('🧩');
      expect(enTranslations.games.puzzle.upload).toContain('📤');
      expect(enTranslations.games.puzzle.newImage).toContain('🖼️');
      expect(enTranslations.games.puzzle.reset).toContain('🔄');
      expect(enTranslations.games.puzzle.difficulty).toContain('🎯');
      expect(enTranslations.games.puzzle.complete).toContain('🎉');
      expect(enTranslations.games.puzzle.original).toContain('🖼️');
      expect(enTranslations.games.puzzle.solve).toContain('🧩');
    });

    it('should have emojis in Memory Game', () => {
      expect(enTranslations.games.memory.title).toContain('🧠');
      expect(enTranslations.games.memory.themes.minecraft).toContain('⛏️');
      expect(enTranslations.games.memory.themes.brainrot).toContain('🤪');
      expect(enTranslations.games.memory.themes.roblox).toContain('🎮');
      expect(enTranslations.games.memory.difficulty.easy).toContain('😊');
      expect(enTranslations.games.memory.difficulty.medium).toContain('🤔');
      expect(enTranslations.games.memory.difficulty.hard).toContain('😤');
      expect(enTranslations.games.memory.moves).toContain('🔢');
      expect(enTranslations.games.memory.matches).toContain('✅');
      expect(enTranslations.games.memory.playAgain).toContain('🔄');
      expect(enTranslations.games.memory.changeDifficulty).toContain('⚙️');
      expect(enTranslations.games.memory.changeTheme).toContain('🎨');
      expect(enTranslations.games.memory.backToThemes).toContain('⬅️');
      expect(enTranslations.games.memory.congratulations).toContain('🎉');
    });
  });

  describe('Hebrew translations', () => {
    it('should have emojis in game titles on home page', () => {
      expect(heTranslations.games.titles['tic-tac-toe']).toContain('⭕');
      expect(heTranslations.games.titles['tic-tac-toe']).toContain('❌');
      expect(heTranslations.games.titles['canvas-drawing']).toContain('🎨');
      expect(heTranslations.games.titles['image-puzzle']).toContain('🧩');
      expect(heTranslations.games.titles['memory-game']).toContain('🧠');
    });

    it('should have emojis in Drawing game', () => {
      expect(heTranslations.games.drawing.title).toContain('🎨');
      expect(heTranslations.games.drawing.color).toContain('🎨');
      expect(heTranslations.games.drawing.size).toContain('📏');
    });

    it('should have emojis in Tic-Tac-Toe game', () => {
      expect(heTranslations.ticTacToe.title).toContain('⭕');
      expect(heTranslations.ticTacToe.newGame).toContain('🎮');
      expect(heTranslations.ticTacToe.easy).toContain('😊');
    });

    it('should have emojis in Memory Game', () => {
      expect(heTranslations.games.memory.title).toContain('🧠');
      expect(heTranslations.games.memory.themes.minecraft).toContain('⛏️');
      expect(heTranslations.games.memory.difficulty.easy).toContain('😊');
    });
  });

  describe('Russian translations', () => {
    it('should have emojis in game titles on home page', () => {
      expect(ruTranslations.games.titles['tic-tac-toe']).toContain('⭕');
      expect(ruTranslations.games.titles['canvas-drawing']).toContain('🎨');
      expect(ruTranslations.games.titles['memory-game']).toContain('🧠');
    });
  });

  describe('Arabic translations', () => {
    it('should have emojis in game titles on home page', () => {
      expect(arTranslations.games.titles['tic-tac-toe']).toContain('⭕');
      expect(arTranslations.games.titles['canvas-drawing']).toContain('🎨');
      expect(arTranslations.games.titles['memory-game']).toContain('🧠');
    });
  });
});
