// 页面切换功能
document.addEventListener('DOMContentLoaded', function() {
    // 初始化页面
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        if (page.id !== 'dashboard') {
            page.style.display = 'none';
        }
    });
    
    // 标签切换
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 移除所有活动状态
            tabBtns.forEach(b => b.classList.remove('active'));
            pages.forEach(page => page.style.display = 'none');
            
            // 添加当前活动状态
            this.classList.add('active');
            const pageId = this.getAttribute('data-page');
            const page = document.getElementById(pageId);
            page.style.display = 'block';
            page.classList.add('active');
        });
    });
    
    // 初始化图表
    initCharts();
    
    // 添加事件监听器
    setupEventListeners();
});

// 初始化图表
function initCharts() {
    // 体重变化图表
    const weightCtx = document.getElementById('weightChart').getContext('2d');
    new Chart(weightCtx, {
        type: 'line',
        data: {
            labels: ['6/15', '6/16', '6/17', '6/18', '6/19', '6/20', '6/21', '6/22', '6/23', '今日'],
            datasets: [{
                label: '体重 (kg)',
                data: [56.2, 56.3, 56.5, 56.6, 56.8, 56.9, 57.0, 57.1, 57.2, 57.3],
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                borderWidth: 3,
                pointRadius: 5,
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,
                    min: 55.5
                }
            }
        }
    });
}

// 设置事件监听器
function setupEventListeners() {
    // 添加体重记录
    document.getElementById('addWeightBtn').addEventListener('click', function() {
        const table = document.getElementById('weightTable');
        const newRow = table.insertRow(-1);
        newRow.innerHTML = `
            <td><input type="date"></td>
            <td><input type="number" step="0.1"></td>
            <td></td>
        `;
    });
    
    // 标记任务完成
    const taskButtons = document.querySelectorAll('.task-actions .btn, table .btn');
    taskButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const taskCard = this.closest('.task-card');
            if (taskCard) {
                taskCard.classList.add('completed');
                this.textContent = '已完成 ✓';
                this.disabled = true;
            }
            
            // 更新进度条
            updateProgress();
        });
    });
    
    // 标记饮食完成
    const mealButtons = document.querySelectorAll('table .btn');
    mealButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            row.classList.add('completed');
            this.textContent = '已完成 ✓';
            this.disabled = true;
            
            // 更新进度条
            updateProgress();
        });
    });
}

// 更新进度条
function updateProgress() {
    // 计算完成的任务数
    const completedTasks = document.querySelectorAll('.completed').length;
    const totalTasks = 6; // 早餐、奶昔1、午餐、奶昔2、晚餐、训练
    
    // 更新进度条
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    const percentage = Math.min(100, Math.round((completedTasks / totalTasks) * 100));
    const calories = Math.round(3150 * (completedTasks / totalTasks));
    
    progressFill.style.width = `${percentage}%`;
    progressText.textContent = `${calories}/3150 大卡 (${percentage}%)`;
}

// 初始化进度条
updateProgress();