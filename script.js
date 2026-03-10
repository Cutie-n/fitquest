// --- DATA: 30 ACHIEVEMENTS ---
const ACHIEVEMENTS = [
    { id: 1, n: "Cheetah", i: "🐆", d: "Run for 3 hours", req: 3, type: "Running" },
    { id: 2, n: "Rest King", i: "👑", d: "Log 10 Sleep sessions", req: 10, type: "SleepCount" },
    { id: 3, n: "Iron Giant", i: "🏋️", d: "Lift for 5 hours", req: 5, type: "Weight Lifting" },
    { id: 4, n: "Dolphin", i: "🐬", d: "2 hours Swimming", req: 2, type: "Swimming" },
    { id: 5, n: "Elite Hero", i: "🛡️", d: "Reach Level 5", req: 5, type: "Level" },
    { id: 6, n: "Zen Monk", i: "🧘", d: "5 hours Meditation", req: 5, type: "Meditation" },
    { id: 7, n: "Mountain Goat", i: "⛰️", d: "3 hours Hiking", req: 3, type: "Hiking" },
    { id: 8, n: "Flash", i: "⚡", d: "Reach Level 10", req: 10, type: "Level" },
    { id: 9, n: "Fire Spirit", i: "🔥", d: "Log 30 Quests", req: 30, type: "TotalCount" },
    { id: 10, n: "Owl", i: "🦉", d: "30 hours Sleep", req: 30, type: "Sleeping" },
    { id: 11, n: "Boxer", i: "🥊", d: "2 hours Shadow Boxing", req: 2, type: "Shadow Boxing" },
    { id: 12, n: "Cyclist", i: "🚲", d: "5 hours Cycling", req: 5, type: "Cycling" },
    { id: 13, n: "Early Bird", i: "☀️", d: "5 logs Morning Sun", req: 5, type: "Morning Sun" },
    { id: 14, n: "Yogi", i: "🕉️", d: "3 hours Yoga", req: 3, type: "Yoga" },
    { id: 15, n: "Walker", i: "👟", d: "10 hours Walking", req: 10, type: "Walking" },
    // Simplified for 30 badges... (Adding placeholder data to reach 30)
    ...Array.from({length: 15}, (_, i) => ({
        id: i + 16, n: `Master ${i+16}`, i: "⭐", d: `Complete milestone ${i+16}`, req: (i+5)*10, type: "TotalCount"
    }))
];

const ANIMALS = [
    {n: "Red Panda", i: "🐾"}, {n: "Fennec Fox", i: "🦊"}, {n: "Quokka", i: "🐨"},
    {n: "Sea Otter", i: "🦦"}, {n: "Axolotl", i: "🦎"}, {n: "Hedgehog", i: "🦔"},
    {n: "Elephant", i: "🐘"}, {n: "Penguin", i: "🐧"}, {n: "Arctic Fox", i: "🐺"},
    {n: "Koala", i: "🐨"}, {n: "Bunny", i: "🐰"}, {n: "Puppy", i: "🐕"},
    {n: "Baby Seal", i: "🦭"}, {n: "Chipmunk", i: "🐿️"}, {n: "Pomeranian", i: "🐩"},
    {n: "Snowy Owl", i: "🦉"}, {n: "Kitten", i: "🐱"}, {n: "Sloth", i: "🦥"},
    {n: "Lion Cub", i: "🦁"}, {n: "Deer", i: "🦌"}
];

const ACTIVITIES = {
    "Sleeping": "Deep rest repairs muscle tissue and flushes brain toxins. 8 hours is your superpower!",
    "Running": "Heart health + stamina. Your spirit animal is proud of your speed!",
    "Weight Lifting": "Building iron! Strong muscles support a long life.",
    "Yoga": "Aligning the soul and body. Flexibility is the key to youth.",
    "Cycling": "Powerful legs and endless lung capacity!",
    "Walking": "Steady progress. 10k steps keeps the doctor away.",
    "Meditation": "Mental armor. A clear mind conquers all battles.",
    "Shadow Boxing": "Fast hands, fast feet. Coordination is your weapon.",
    "Swimming": "Full body resistance. Water is your ally.",
    "Morning Sun": "Vitamin D reset. Wake up your internal clock!"
};

// --- LOGIC ---
let xp = 0, level = 1, stats = { totalHours: {}, totalLogs: 0 };

window.onload = () => {
    // Setup select boxes
    const aSel = document.getElementById('animal-select');
    ANIMALS.forEach(a => aSel.innerHTML += `<option value="${a.i}">${a.i} ${a.n}</option>`);

    const actSel = document.getElementById('activity-select');
    Object.keys(ACTIVITIES).forEach(act => actSel.innerHTML += `<option value="${act}">${act}</option>`);

    // Setup Badges
    const grid = document.getElementById('achievement-grid');
    ACHIEVEMENTS.forEach(ach => {
        grid.innerHTML += `<div class="badge" id="badge-${ach.id}" title="${ach.d}">
            <i style="font-style: normal; font-size: 2rem;">${ach.i}</i>
            <span>${ach.n}</span>
        </div>`;
    });

    lucide.createIcons();
};

function login() {
    const user = document.getElementById('username').value || "Warrior";
    document.getElementById('display-username').innerText = user;
    document.getElementById('guide-icon').innerText = document.getElementById('animal-select').value;
    document.getElementById('login-page').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    handleActivityChange();
}

function handleActivityChange() {
    const act = document.getElementById('activity-select').value;
    document.getElementById('guide-msg').innerText = ACTIVITIES[act] || "Keep up the grind!";
}

function logQuest() {
    const act = document.getElementById('activity-select').value;
    const h = parseInt(document.getElementById('hrs').value) || 0;
    const m = parseInt(document.getElementById('mins').value) || 0;
    
    xp += (h * 100) + (m * 2);
    stats.totalHours[act] = (stats.totalHours[act] || 0) + h + (m/60);
    stats.totalLogs++;

    if (xp >= 500) { level++; xp -= 500; alert(`Level Up! You are now Level ${level}`); }
    
    updateUI();
    checkBadges();
}

function updateUI() {
    document.getElementById('level-val').innerText = level;
    document.getElementById('xp-text').innerText = `${xp}/500 XP`;
    document.getElementById('xp-fill').style.width = (xp / 500 * 100) + "%";
}

function checkBadges() {
    let unlockedCount = 0;
    ACHIEVEMENTS.forEach(ach => {
        let unlocked = false;
        if(ach.type === "Level" && level >= ach.req) unlocked = true;
        if(ach.type === "TotalCount" && stats.totalLogs >= ach.req) unlocked = true;
        if(stats.totalHours[ach.type] >= ach.req) unlocked = true;
        if(ach.type === "SleepCount" && (stats.totalHours["Sleeping"] || 0) > 1 && stats.totalLogs > ach.req) unlocked = true;

        if(unlocked) {
            document.getElementById(`badge-${ach.id}`).classList.add('unlocked');
            unlockedCount++;
        }
    });
    document.getElementById('unlocked-count').innerText = unlockedCount;
}

function toggleAvatarModal() {
    const modal = document.getElementById('avatar-modal');
    modal.classList.toggle('hidden');
    if(!modal.classList.contains('hidden')) {
        const grid = document.getElementById('avatar-options');
        grid.innerHTML = "";
        for(let i=1; i<=30; i++) {
            grid.innerHTML += `<img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Quest${i}" onclick="selectAvatar(this.src)">`;
        }
    }
}

function selectAvatar(src) {
    document.getElementById('user-avatar').src = src;
    toggleAvatarModal();
}