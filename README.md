# 🪙 CryptoNext - Real-time Crypto Tracker

אפליקציית מעקב קריפטו מודרנית ומהירה שנבנתה עם **Next.js 15**, **TypeScript**, ו-**Tailwind CSS**.

---

## 🚀 פיצ'רים נוכחיים (Current Version)
- **נתונים בזמן אמת:** משיכת נתוני שוק חיים מה-API של CoinGecko.
- **חיפוש וסינון:** מנגנון חיפוש מהיר בצד הלקוח (Client-side filtering).
- **ניתוב דינמי (Dynamic Routing):** דף פירוט ייעודי לכל מטבע המבוסס על ה-ID שלו.
- **מבנה מודולרי:** הפרדה מלאה בין לוגיקה (Logic) לתצוגה (UI).
- **עיצוב כהה (Dark Mode):** ממשק משתמש מודרני מבוסס Slate & Blue.

## 🏗️ ארכיטקטורה (Based on Miro Flowchart)
הפרויקט מבוסס על מבנה היררכי מסודר:
- **Global Layout:** ניהול ה-Header וה-Navbar בצורה אחידה לכל האתר.
- **Component Based:** שימוש ברכיבים לשימוש חוזר כמו `CoinCard` ו-`CoinList`.
- **Data Flow:** האבא (`Page`) מביא נתונים, והבנים (`Components`) מציגים ומסננים אותם.

## 🗺️ תוכנית פיתוח (Roadmap)
*האזורים האפורים בתרשים ה-Miro שלנו שיהפכו לקוד בקרוב:*
- [ ] **Interactive Charts:** הוספת גרפים ויזואליים לשינויי מחיר (7 ימים אחרונים).
- [ ] **Watchlist:** אפשרות למשתמש לסמן מטבעות מועדפים (שמירה ב-Local Storage).
- [ ] **Currency Converter:** מחשבון המרה מהיר מקריפטו למטבעות פיאט (USD/ILS).