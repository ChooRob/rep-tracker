const STORAGE_KEYS = {
  theme: 'theme',
  currentExercise: 'currentExercise',
  dailyGoal: 'dailyGoal',
  repData: 'repData',
  calendarView: 'calendarView',
  activeGroupId: 'repTracker.activeGroupId',
  auth: 'repTracker.auth'
};

const COLLECTIONS = {
  users: 'users',
  groups: 'groups',
  groupMembers: 'group_members',
  dailyProgress: 'daily_progress'
};

const API_ROUTES = {
  createUser: `/api/collections/${COLLECTIONS.users}/records`,
  authWithPassword: `/api/collections/${COLLECTIONS.users}/auth-with-password`,
  authRefresh: `/api/collections/${COLLECTIONS.users}/auth-refresh`
};

const exerciseData = {
  'Push-ups': {
    key: 'pushups',
    color: '#007AFF',
    icon: '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 30 30" style="enable-background:new 0 0 94.5 94.5;" xml:space="preserve" width="30" height="30"><g><path d="M2.31 20.601a1.587 1.587 0 0 0 1.466 0.97c0.211 0 0.418 -0.042 0.613 -0.124L13.068 17.787q0.153 -0.065 0.284 -0.156a0.952 0.952 0 0 0 0.23 -0.061l7.423 -3.13 2.814 6.672a0.951 0.951 0 0 0 1.248 0.508l0.658 -0.277a0.943 0.943 0 0 0 0.511 -0.519 0.946 0.946 0 0 0 -0.004 -0.729L22.902 12.196l0 0 -0.64 -1.518a0.951 0.951 0 0 0 -1.248 -0.508l-8.959 3.778a0.952 0.952 0 0 0 -0.576 0.943L3.112 18.419c-0.39 0.164 -0.692 0.471 -0.852 0.865s-0.158 0.825 0.006 1.214z"/><path d="M26.57 13.19c0.431 0 0.853 -0.086 1.253 -0.254a3.206 3.206 0 0 0 1.736 -1.758 3.206 3.206 0 0 0 -0.016 -2.471 3.222 3.222 0 0 0 -2.976 -1.974c-0.431 0 -0.853 0.085 -1.253 0.254 -1.64 0.692 -2.412 2.589 -1.72 4.229a3.224 3.224 0 0 0 2.976 1.974"/><path d="M29.365 21.998H0.635a0.635 0.635 0 0 0 0 1.27h28.73a0.635 0.635 0 0 0 0 -1.27"/></g></svg>'
  },
  'Squats': {
    key: 'squats',
    color: '#34C759',
    icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 30 30" style="enable-background:new 0 0 256 256;" xml:space="preserve" width="30" height="30"><g><path cx="127" cy="28.4" r="26.6" d="M18 3.328A3.117 3.117 0 0 1 14.883 6.445A3.117 3.117 0 0 1 11.766 3.328A3.117 3.117 0 0 1 18 3.328z"/><path d="M25.008 20.063h-5.836V11.402c0 -0.211 0.176 -0.387 0.387 -0.387 0.07 0 0.141 0.023 0.199 0.059l3.527 2.027 -2.438 4.219c-0.375 0.656 -0.152 1.488 0.504 1.863s1.488 0.152 1.863 -0.504l3.117 -5.391c0.375 -0.656 0.152 -1.488 -0.504 -1.863l-6.047 -3.492c-0.551 -0.387 -1.172 -0.633 -1.816 -0.703l-3.082 -0.012 -3.082 0.012c-0.645 0.07 -1.266 0.316 -1.816 0.703L3.938 11.426c-0.656 0.375 -0.879 1.207 -0.504 1.863l3.117 5.391c0.375 0.656 1.207 0.879 1.863 0.504s0.879 -1.207 0.504 -1.863l-2.438 -4.219 3.527 -2.027c0.059 -0.035 0.129 -0.059 0.199 -0.059 0.211 0 0.387 0.176 0.387 0.387v8.66H4.758c-1.078 0 -1.945 0.867 -1.945 1.945 0 0.539 0.211 1.02 0.563 1.371l5.824 5.824c0.762 0.762 1.992 0.762 2.754 0s0.762 -1.992 0 -2.754l-2.496 -2.496h5.414v-1.559h5.414l-2.496 2.496c-0.762 0.762 -0.762 1.992 0 2.754s1.992 0.762 2.754 0l5.824 -5.824c0.352 -0.352 0.563 -0.832 0.563 -1.371 0.023 -1.066 -0.844 -1.945 -1.922 -1.945"/></g></svg>'
  },
  'Sit-ups': {
    key: 'situps',
    color: '#FF9500',
    icon: '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="30" height="30" viewBox="0 0 30 30" style="enable-background:new 0 0 483.791 483.791;" xml:space="preserve"><g><g id="_x32_4_27_"><path d="M29.131 23.236 20.564 16.568c-0.898 -0.739 -2.198 -0.722 -3.076 0.04L11.269 21.622c-0.148 0.071 -0.285 0.091 -0.387 0.017 -0.408 -0.292 -2.023 -5.407 -2.334 -6.418a0.843 0.843 0 0 1 -0.036 -0.299l6.286 -3.061a2.001 2.001 0 0 0 -0.139 -3.659L6.549 4.989a2.046 2.046 0 0 0 -0.094 -0.034c-0.01 -0.004 -0.021 -0.007 -0.032 -0.01 -0.021 -0.007 -0.042 -0.014 -0.063 -0.02 -0.013 -0.004 -0.025 -0.007 -0.038 -0.01 -0.019 -0.005 -0.038 -0.01 -0.057 -0.015 -0.013 -0.003 -0.027 -0.006 -0.04 -0.009a1.922 1.922 0 0 0 -0.055 -0.011q-0.021 -0.004 -0.042 -0.007a1.798 1.798 0 0 0 -0.054 -0.008c-0.014 -0.002 -0.028 -0.003 -0.042 -0.005q-0.027 -0.003 -0.053 -0.005 -0.022 -0.002 -0.043 -0.003a1.86 1.86 0 0 0 -0.096 -0.004c-0.009 0 -0.018 -0.001 -0.028 -0.001 -0.005 0 -0.01 0 -0.015 0.001 -0.044 0 -0.088 0.002 -0.131 0.005q-0.005 0 -0.011 0.001 -0.061 0.005 -0.122 0.014c-0.043 0.007 -0.086 0.015 -0.128 0.024 -0.057 0.013 -0.114 0.03 -0.114 0.03 -0.062 0.019 -0.122 0.042 -0.122 0.042 -0.053 0.021 -0.106 0.045 -0.106 0.045 -0.058 0.028 -0.115 0.059 -0.115 0.059 -0.049 0.029 -0.097 0.06 -0.097 0.06 -0.054 0.036 -0.105 0.076 -0.105 0.076 -0.045 0.036 -0.088 0.074 -0.088 0.074a1.984 1.984 0 0 0 -0.114 0.113q-0.041 0.043 -0.079 0.089a1.984 1.984 0 0 0 -0.098 0.132 2.046 2.046 0 0 0 -0.068 0.107 2.046 2.046 0 0 0 -0.079 0.15 2.046 2.046 0 0 0 -0.056 0.128c-0.407 1.027 0.096 2.19 1.123 2.597l3.08 1.22c-0.258 0.086 -0.6 0.201 -0.982 0.328l-2.343 -0.928c-0.663 -0.262 -1.183 -0.767 -1.466 -1.421 -0.283 -0.654 -0.294 -1.379 -0.032 -2.042 0.405 -1.024 1.379 -1.686 2.481 -1.686h0c0.337 0 0.667 0.063 0.982 0.188l2.252 0.892c-0.712 -1.694 -2.387 -2.884 -4.34 -2.884C2.107 2.378 0 4.485 0 7.084c0 2.097 1.372 3.872 3.267 4.48 -1.243 0.419 -3.509 1.584 -1.349 8.036 1.989 5.942 3.901 7.527 5.696 7.949 0.238 0.08 3.252 0.073 3.252 0.073 0.574 0 0.94 -0.156 1.373 -0.532l6.852 -5.563 7.012 5.389c1.016 0.836 2.518 0.69 3.354 -0.326s0.69 -2.518 -0.326 -3.354M8.966 10.251l-0.024 0.012q-0.005 -0.013 -0.011 -0.026z"/></g></g></svg>'
  },
  'Pull-ups': {
    key: 'pullups',
    color: '#AF52DE',
    icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 30 30" style="enable-background:new 0 0 512.002 512.002;" xml:space="preserve" width="30" height="30"><g><g><path d="m12.571 20.228 -0.734 0.779c-0.487 0.517 -0.463 1.331 0.054 1.818 0.517 0.488 1.331 0.463 1.818 -0.054l1.041 -1.104z"/></g></g><g><g><path d="M11.897 2.245c0 -0.084 0.004 -0.167 0.011 -0.249h-0.576l-0.049 1.684h0.968a3.076 3.076 0 0 1 -0.354 -1.435"/></g></g><g><g><path d="m18.707 3.681 -0.049 -1.684h-0.579c0.007 0.082 0.011 0.165 0.011 0.249a3.076 3.076 0 0 1 -0.354 1.435z"/></g></g><g><g><path d="M21.5 2.164c-0.023 -0.532 -0.463 -0.947 -0.989 -0.947q-0.021 0 -0.041 0.001c-0.546 0.023 -0.969 0.484 -0.946 1.03l0.102 2.419 -3.188 0.232h-2.886l-3.188 -0.232 0.102 -2.419c0.023 -0.546 -0.401 -1.007 -0.946 -1.03q-0.022 -0.001 -0.044 -0.001c-0.526 0 -0.964 0.416 -0.986 0.947l-0.144 3.395c-0.023 0.541 0.393 0.999 0.933 1.029l2.863 0.159v6.437l-1.919 2.583c-0.44 0.592 -0.292 1.434 0.323 1.84l5.556 3.671c0.593 0.392 1.391 0.228 1.782 -0.364 0.392 -0.593 0.229 -1.39 -0.364 -1.782l-4.422 -2.922 1.57 -2.112h0.848l0.815 2.14 -0.478 0.507 2.178 1.439 0.725 -0.769a1.286 1.286 0 0 0 0.266 -1.34l-1.202 -3.157V6.748l2.89 -0.16c0.54 -0.03 0.956 -0.489 0.933 -1.029z"/></g></g><g><g><path d="M7.47 27.575h-1.631V3.681h1.711c0.072 -1.693 0.065 -1.582 0.076 -1.684H4.997c-0.465 0 -0.842 0.377 -0.842 0.842v24.736h-1.631a0.356 0.356 0 0 0 -0.356 0.356v1.713a0.356 0.356 0 0 0 0.356 0.356h4.946a0.356 0.356 0 0 0 0.356 -0.356v-1.713a0.356 0.356 0 0 0 -0.356 -0.356"/></g></g><g><g><path d="M27.476 27.575h-1.641V2.839c0 -0.465 -0.377 -0.842 -0.842 -0.842H22.364c0.011 0.102 0.005 -0.009 0.076 1.684h1.711v23.894H22.53a0.356 0.356 0 0 0 -0.356 0.356v1.713a0.356 0.356 0 0 0 0.356 0.356h4.946a0.356 0.356 0 0 0 0.356 -0.356V27.931a0.356 0.356 0 0 0 -0.356 -0.356"/></g></g><g><g><path cx="255.889" cy="38.321" r="38.321" d="M17.239 2.245A2.245 2.245 0 0 1 14.993 4.491A2.245 2.245 0 0 1 12.748 2.245A2.245 2.245 0 0 1 17.239 2.245z"/></g></g></svg>'
  }
};

const exercises = Object.keys(exerciseData);

const dom = {
  authCard: document.getElementById('auth-card'),
  authForm: document.getElementById('auth-form'),
  authTitle: document.getElementById('auth-title'),
  authModeToggle: document.getElementById('auth-mode-toggle'),
  authSubmitBtn: document.getElementById('auth-submit-btn'),
  authFeedback: document.getElementById('auth-feedback'),
  displayNameField: document.getElementById('display-name-field'),
  displayNameInput: document.getElementById('display-name-input'),
  emailInput: document.getElementById('email-input'),
  passwordInput: document.getElementById('password-input'),
  confirmPasswordField: document.getElementById('confirm-password-field'),
  confirmPasswordInput: document.getElementById('confirm-password-input'),
  accountSummary: document.getElementById('account-summary'),
  accountName: document.getElementById('account-name'),
  accountEmail: document.getElementById('account-email'),
  signOutBtn: document.getElementById('sign-out-btn'),
  activeGroupName: document.getElementById('active-group-name'),
  activeGroupMeta: document.getElementById('active-group-meta'),
  createGroupBtn: document.getElementById('create-group-btn'),
  joinGroupBtn: document.getElementById('join-group-btn'),
  groupFeedback: document.getElementById('group-feedback'),
  switchGroupBtn: document.getElementById('switch-group-btn'),
  createGroupModal: document.getElementById('create-group-modal'),
  createGroupInput: document.getElementById('create-group-input'),
  createGroupFeedback: document.getElementById('create-group-feedback'),
  confirmCreateGroupBtn: document.getElementById('confirm-create-group-btn'),
  cancelCreateGroupBtn: document.getElementById('cancel-create-group-btn'),
  joinGroupModal: document.getElementById('join-group-modal'),
  joinGroupInput: document.getElementById('join-group-input'),
  joinGroupFeedback: document.getElementById('join-group-feedback'),
  confirmJoinGroupBtn: document.getElementById('confirm-join-group-btn'),
  cancelJoinGroupBtn: document.getElementById('cancel-join-group-btn'),
  switchGroupModal: document.getElementById('switch-group-modal'),
  groupPicker: document.getElementById('group-picker'),
  switchGroupFeedback: document.getElementById('switch-group-feedback'),
  confirmSwitchGroupBtn: document.getElementById('confirm-switch-group-btn'),
  cancelSwitchGroupBtn: document.getElementById('cancel-switch-group-btn'),
  trackerStatusNote: document.getElementById('tracker-status-note'),
  repCountDisplay: document.getElementById('rep-count'),
  showRepModalBtn: document.getElementById('show-rep-modal-btn'),
  resetBtn: document.getElementById('reset-btn'),
  historyList: document.getElementById('history-list'),
  progressBar: document.getElementById('progress-bar'),
  goalDisplay: document.getElementById('current-goal-display'),
  setGoalBtn: document.getElementById('set-goal-btn'),
  themeToggle: document.getElementById('theme-toggle'),
  shareBtn: document.getElementById('share-btn'),
  successSound: document.getElementById('success-sound'),
  calendarGrid: document.getElementById('calendar-grid'),
  monthYearHeader: document.getElementById('month-year-header'),
  prevMonthBtn: document.getElementById('prev-month-btn'),
  nextMonthBtn: document.getElementById('next-month-btn'),
  calendarViewToggle: document.getElementById('calendar-view-toggle'),
  repModal: document.getElementById('rep-modal'),
  confirmRepsBtn: document.getElementById('confirm-reps-btn'),
  cancelRepsBtn: document.getElementById('cancel-reps-btn'),
  circularSlider: document.getElementById('circular-slider'),
  modalRepCount: document.getElementById('modal-rep-count'),
  progressCircle: document.querySelector('.slider-progress'),
  handleCircle: document.querySelector('.slider-handle'),
  exerciseTitleBtn: document.getElementById('exercise-title-btn'),
  exerciseModal: document.getElementById('exercise-modal'),
  exercisePicker: document.getElementById('exercise-picker'),
  confirmExerciseBtn: document.getElementById('confirm-exercise-btn'),
  groupProgressContainer: document.getElementById('group-progress-container'),
  groupProgressDate: document.getElementById('group-progress-date'),
  groupProgressEmpty: document.getElementById('group-progress-empty'),
  groupProgressList: document.getElementById('group-progress-list')
};

const appState = {
  authMode: 'signin',
  session: {
    status: 'signed_out',
    token: '',
    user: null,
    error: ''
  },
  ui: {
    theme: localStorage.getItem(STORAGE_KEYS.theme) || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
    calendarView: localStorage.getItem(STORAGE_KEYS.calendarView) || 'monthly',
    selectedDate: new Date(),
    loading: {
      session: false,
      groups: false
    }
  },
  personal: {
    currentExercise: localStorage.getItem(STORAGE_KEYS.currentExercise) || 'Push-ups',
    dailyGoal: Number(localStorage.getItem(STORAGE_KEYS.dailyGoal)) || 100,
    repData: JSON.parse(localStorage.getItem(STORAGE_KEYS.repData)) || {},
    totalReps: 0,
    history: []
  },
  group: {
    activeGroupId: localStorage.getItem(STORAGE_KEYS.activeGroupId) || '',
    groups: [],
    selectedGroupId: ''
  }
};

let currentDate = new Date();
let selectedExerciseInPicker = appState.personal.currentExercise;
let currentSliderReps = 0;

const slider = { center: 60, radius: 54, isDragging: false, startAngle: 0, currentAngle: 0, repsPerRotation: 10 };

function deriveSelectedPersonalState() {
  const dateStr = getFormattedDate(appState.ui.selectedDate);
  const dayData = appState.personal.repData[dateStr] || {};
  const exerciseStats = dayData[appState.personal.currentExercise] || { total: 0, history: [] };
  appState.personal.totalReps = Number(exerciseStats.total) || 0;
  appState.personal.history = Array.isArray(exerciseStats.history) ? exerciseStats.history : [];
}

function getFormattedDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function setInlineFeedback(element, message, clear = false) {
  if (!element) {
    return;
  }
  element.textContent = clear ? '' : message;
}

function getSavedAuthState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.auth);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw);
    if (!parsed?.token || !parsed?.record) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function getUserDisplayName(record) {
  return record?.displayName || record?.name || record?.email?.split('@')[0] || 'Account';
}

function persistAuthState() {
  if (appState.session.status !== 'signed_in' || !appState.session.token || !appState.session.user) {
    localStorage.removeItem(STORAGE_KEYS.auth);
    return;
  }
  localStorage.setItem(STORAGE_KEYS.auth, JSON.stringify({
    token: appState.session.token,
    record: appState.session.user
  }));
}

function setSignedOutState() {
  appState.session.status = 'signed_out';
  appState.session.token = '';
  appState.session.user = null;
  appState.session.error = '';
  appState.group.groups = [];
  appState.group.activeGroupId = '';
  appState.group.selectedGroupId = '';
  localStorage.removeItem(STORAGE_KEYS.auth);
  localStorage.removeItem(STORAGE_KEYS.activeGroupId);
}

function setSignedInState(authData) {
  appState.session.status = 'signed_in';
  appState.session.token = authData.token;
  appState.session.user = authData.record;
  appState.session.error = '';
  persistAuthState();
}

async function apiRequest(path, options = {}) {
  const response = await fetch(path, {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
      ...(options.headers || {})
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  const responseText = await response.text();
  const data = responseText ? JSON.parse(responseText) : null;

  if (!response.ok) {
    const message = data?.message || 'Request failed.';
    throw new Error(message);
  }

  return data;
}

function buildRecordsListPath(collectionName, params = {}) {
  const searchParams = new URLSearchParams(params);
  return `/api/collections/${collectionName}/records?${searchParams.toString()}`;
}

function escapeFilterValue(value) {
  return String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function persistActiveGroup() {
  if (appState.group.activeGroupId) {
    localStorage.setItem(STORAGE_KEYS.activeGroupId, appState.group.activeGroupId);
    return;
  }
  localStorage.removeItem(STORAGE_KEYS.activeGroupId);
}

function setActiveGroup(groupId) {
  appState.group.activeGroupId = groupId;
  appState.group.selectedGroupId = groupId;
  persistActiveGroup();
}

function getActiveAuthToken() {
  return appState.session.token;
}

function normalizeGroupRecord(record) {
  return {
    id: record.id,
    name: record.name,
    joinCode: record.joinCode,
    owner: record.owner,
    isActive: record.isActive !== false
  };
}

async function listRecords(collectionName, params) {
  return apiRequest(buildRecordsListPath(collectionName, params), {
    token: getActiveAuthToken()
  });
}

async function createRecord(collectionName, body) {
  return apiRequest(`/api/collections/${collectionName}/records`, {
    method: 'POST',
    token: getActiveAuthToken(),
    body
  });
}

function generateJoinCode() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let index = 0; index < 6; index += 1) {
    code += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return code;
}

async function loadGroups() {
  if (appState.session.status !== 'signed_in' || !appState.session.user?.id) {
    appState.group.groups = [];
    setActiveGroup('');
    return;
  }

  appState.ui.loading.groups = true;
  try {
    const membershipResponse = await listRecords(COLLECTIONS.groupMembers, {
      page: '1',
      perPage: '50',
      sort: '-created',
      expand: 'group',
      filter: `user="${escapeFilterValue(appState.session.user.id)}" && status="active"`
    });

    appState.group.groups = membershipResponse.items
      .map((membership) => membership.expand?.group || null)
      .filter((group) => group && group.isActive !== false)
      .map(normalizeGroupRecord);

    const hasActiveGroup = appState.group.groups.some((group) => group.id === appState.group.activeGroupId);
    if (!hasActiveGroup) {
      setActiveGroup(appState.group.groups[0]?.id || '');
    } else {
      appState.group.selectedGroupId = appState.group.activeGroupId;
      persistActiveGroup();
    }
  } finally {
    appState.ui.loading.groups = false;
  }
}

function getAuthFormValues() {
  return {
    displayName: dom.displayNameInput.value.trim(),
    email: dom.emailInput.value.trim().toLowerCase(),
    password: dom.passwordInput.value,
    confirmPassword: dom.confirmPasswordInput.value
  };
}

function validateAuthForm() {
  const values = getAuthFormValues();
  if (!values.email) {
    throw new Error('Email is required.');
  }
  if (!values.password) {
    throw new Error('Password is required.');
  }
  if (appState.authMode === 'signup') {
    if (values.displayName.length < 2) {
      throw new Error('Display name must be at least 2 characters.');
    }
    if (values.password.length < 8) {
      throw new Error('Password must be at least 8 characters.');
    }
    if (values.password !== values.confirmPassword) {
      throw new Error('Passwords do not match.');
    }
  }
  return values;
}

function resetAuthForm() {
  dom.authForm.reset();
}

function setAuthLoading(isLoading) {
  appState.ui.loading.session = isLoading;
  dom.authSubmitBtn.disabled = isLoading;
  dom.authModeToggle.disabled = isLoading;
}

async function signIn(email, password) {
  const authData = await apiRequest(API_ROUTES.authWithPassword, {
    method: 'POST',
    body: {
      identity: email,
      password
    }
  });
  setSignedInState(authData);
  await loadGroups();
}

async function signUp(values) {
  await apiRequest(API_ROUTES.createUser, {
    method: 'POST',
    body: {
      email: values.email,
      password: values.password,
      passwordConfirm: values.confirmPassword,
      displayName: values.displayName,
      isActive: true
    }
  });
  await signIn(values.email, values.password);
}

async function restoreSession() {
  const savedAuth = getSavedAuthState();
  if (!savedAuth) {
    setSignedOutState();
    return;
  }

  appState.ui.loading.session = true;
  try {
    const refreshed = await apiRequest(API_ROUTES.authRefresh, {
      method: 'POST',
      token: savedAuth.token
    });
    setSignedInState(refreshed);
    await loadGroups();
  } catch {
    setSignedOutState();
  } finally {
    appState.ui.loading.session = false;
  }
}

async function handleAuthSubmit() {
  setInlineFeedback(dom.authFeedback, '', true);
  setAuthLoading(true);

  try {
    const values = validateAuthForm();
    if (appState.authMode === 'signup') {
      await signUp(values);
      setInlineFeedback(dom.authFeedback, 'Account created.');
    } else {
      await signIn(values.email, values.password);
    }
    resetAuthForm();
    renderApp();
  } catch (error) {
    appState.session.error = error.message;
    setInlineFeedback(dom.authFeedback, error.message);
  } finally {
    setAuthLoading(false);
    renderAuthState();
  }
}

function signOut() {
  setSignedOutState();
  setInlineFeedback(dom.authFeedback, '', true);
  setInlineFeedback(dom.groupFeedback, '', true);
  closeModal(dom.createGroupModal);
  closeModal(dom.joinGroupModal);
  closeModal(dom.switchGroupModal);
  renderApp();
}

function persistPersonalState() {
  const dateStr = getFormattedDate(appState.ui.selectedDate);
  if (!appState.personal.repData[dateStr]) {
    appState.personal.repData[dateStr] = {};
  }
  appState.personal.repData[dateStr][appState.personal.currentExercise] = {
    total: appState.personal.totalReps,
    history: appState.personal.history
  };
  localStorage.setItem(STORAGE_KEYS.currentExercise, appState.personal.currentExercise);
  localStorage.setItem(STORAGE_KEYS.dailyGoal, String(appState.personal.dailyGoal));
  localStorage.setItem(STORAGE_KEYS.repData, JSON.stringify(appState.personal.repData));
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(STORAGE_KEYS.theme, theme);
  dom.themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
}

function renderAuthState() {
  const isSignUp = appState.authMode === 'signup';
  const isSignedIn = appState.session.status === 'signed_in';
  dom.authCard.hidden = isSignedIn;
  dom.accountSummary.hidden = !isSignedIn;
  if (isSignedIn) {
    return;
  }
  dom.authTitle.textContent = isSignUp ? 'Create Account' : 'Sign In';
  dom.authModeToggle.textContent = isSignUp ? 'Have an account?' : 'Create Account';
  dom.authSubmitBtn.textContent = isSignUp ? 'Create Account' : 'Sign In';
  dom.displayNameField.hidden = !isSignUp;
  dom.confirmPasswordField.hidden = !isSignUp;
  dom.passwordInput.autocomplete = isSignUp ? 'new-password' : 'current-password';
  dom.authSubmitBtn.disabled = appState.ui.loading.session;
  dom.authModeToggle.disabled = appState.ui.loading.session;
}

function renderGroupSummary() {
  if (appState.session.status !== 'signed_in') {
    return;
  }
  dom.accountName.textContent = getUserDisplayName(appState.session.user);
  dom.accountEmail.textContent = appState.session.user?.email || '';
  dom.createGroupBtn.disabled = false;
  dom.joinGroupBtn.disabled = false;
  const activeGroup = appState.group.groups.find((group) => group.id === appState.group.activeGroupId);
  if (!activeGroup) {
    dom.activeGroupName.textContent = 'No Group Selected';
    dom.activeGroupMeta.textContent = appState.ui.loading.groups ? 'Loading your groups...' : 'Create or join a group when you want to share progress.';
    dom.switchGroupBtn.disabled = appState.group.groups.length === 0;
    return;
  }
  dom.activeGroupName.textContent = activeGroup.name;
  dom.activeGroupMeta.textContent = activeGroup.joinCode ? `Join code: ${activeGroup.joinCode}` : 'This group is ready for shared progress.';
  dom.switchGroupBtn.disabled = false;
}

function renderTrackerInteractivity() {
  const shouldDisable = appState.session.status !== 'signed_in';
  dom.showRepModalBtn.disabled = shouldDisable;
  dom.resetBtn.disabled = shouldDisable;
  dom.setGoalBtn.disabled = shouldDisable;
  dom.shareBtn.disabled = shouldDisable;
  dom.exerciseTitleBtn.disabled = shouldDisable;
  dom.trackerStatusNote.textContent = shouldDisable
    ? 'Sign in to save progress to your account and share it with groups later.'
    : appState.group.activeGroupId
      ? 'Your personal tracker is active and current progress can be shared with the selected group.'
      : 'Your personal tracker is active. Groups are optional.';
}

function renderPersonalTracker() {
  deriveSelectedPersonalState();
  const currentData = exerciseData[appState.personal.currentExercise];
  dom.exerciseTitleBtn.querySelector('h1').textContent = appState.personal.currentExercise;
  dom.exerciseTitleBtn.querySelector('.icon-container').innerHTML = currentData.icon;
  const icon = dom.exerciseTitleBtn.querySelector('.icon-container svg');
  if (icon) {
    icon.style.stroke = currentData.color;
  }
  dom.repCountDisplay.textContent = appState.personal.totalReps;
  dom.repCountDisplay.style.color = currentData.color;
  dom.goalDisplay.textContent = appState.personal.dailyGoal;
  const percentage = appState.personal.dailyGoal > 0 ? (appState.personal.totalReps / appState.personal.dailyGoal) * 100 : 0;
  dom.progressBar.style.width = `${Math.min(percentage, 100)}%`;
  dom.progressBar.style.background = appState.personal.totalReps >= appState.personal.dailyGoal ? '#FFD700' : currentData.color;
}

function renderHistory() {
  dom.historyList.innerHTML = '';
  const accentColor = exerciseData[appState.personal.currentExercise].color;
  appState.personal.history.slice().reverse().forEach((item) => {
    const li = document.createElement('li');
    li.className = 'history-item';
    li.innerHTML = `<span><strong style="color:${accentColor};">+${item.amount}</strong> reps</span><span class="history-time">${item.time}</span>`;
    dom.historyList.appendChild(li);
  });
}

function renderCalendar() {
  dom.calendarGrid.innerHTML = '';
  dom.calendarGrid.removeAttribute('data-view');
  if (appState.ui.calendarView === 'monthly') {
    dom.calendarViewToggle.textContent = 'Weekly View';
    renderMonthlyView();
  } else if (appState.ui.calendarView === 'weekly') {
    dom.calendarViewToggle.textContent = 'Daily View';
    renderWeeklyView();
  } else {
    dom.calendarViewToggle.textContent = 'Monthly View';
    renderDailyView();
  }
}

function renderMonthlyView() {
  dom.calendarGrid.setAttribute('data-view', 'monthly');
  const month = appState.ui.selectedDate.getMonth();
  const year = appState.ui.selectedDate.getFullYear();
  dom.monthYearHeader.textContent = `${appState.ui.selectedDate.toLocaleString('default', { month: 'long' })} ${year}`;
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDay = firstDay.getDay();
  ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach((name) => {
    const dayNameCell = document.createElement('div');
    dayNameCell.className = 'day-name';
    dayNameCell.textContent = name;
    dom.calendarGrid.appendChild(dayNameCell);
  });
  for (let index = 0; index < startingDay; index += 1) {
    dom.calendarGrid.appendChild(document.createElement('div'));
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    dom.calendarGrid.appendChild(createDayCell(new Date(year, month, day)));
  }
}

function renderWeeklyView() {
  dom.calendarGrid.setAttribute('data-view', 'weekly');
  const startOfWeek = new Date(appState.ui.selectedDate);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 6);
  dom.monthYearHeader.textContent = `${startOfWeek.toLocaleDateString('default', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('default', { month: 'short', day: 'numeric' })}`;
  ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach((name) => {
    const dayNameCell = document.createElement('div');
    dayNameCell.className = 'day-name';
    dayNameCell.textContent = name;
    dom.calendarGrid.appendChild(dayNameCell);
  });
  for (let index = 0; index < 7; index += 1) {
    const date = new Date(startOfWeek);
    date.setDate(date.getDate() + index);
    dom.calendarGrid.appendChild(createDayCell(date));
  }
}

function renderDailyView() {
  const dateStr = getFormattedDate(appState.ui.selectedDate);
  const dayData = appState.personal.repData[dateStr] || {};
  dom.monthYearHeader.textContent = appState.ui.selectedDate.toLocaleDateString('default', { weekday: 'long', month: 'long', day: 'numeric' });
  dom.calendarGrid.setAttribute('data-view', 'daily');
  dom.calendarGrid.innerHTML = '';
  const exercisesDone = Object.keys(dayData);
  if (exercisesDone.length === 0) {
    dom.calendarGrid.innerHTML = '<div class="no-data-day">No exercises recorded for this day.</div>';
    return;
  }
  exercisesDone.forEach((exercise) => {
    if (!exerciseData[exercise]) {
      return;
    }
    const row = document.createElement('div');
    row.className = 'day-view-row';
    const exerciseInfo = document.createElement('div');
    exerciseInfo.className = 'day-view-exercise';
    exerciseInfo.innerHTML = `${exerciseData[exercise].icon} <span>${exercise}</span>`;
    const icon = exerciseInfo.querySelector('svg');
    if (icon) {
      icon.style.stroke = exerciseData[exercise].color;
    }
    const repsInfo = document.createElement('div');
    repsInfo.className = 'day-view-reps';
    repsInfo.innerHTML = `<span>${dayData[exercise].total}</span> reps`;
    row.appendChild(exerciseInfo);
    row.appendChild(repsInfo);
    dom.calendarGrid.appendChild(row);
  });
}

function createDayCell(date) {
  const dateStr = getFormattedDate(date);
  const dayCell = document.createElement('div');
  dayCell.className = 'calendar-day';
  const dayNumber = document.createElement('span');
  dayNumber.className = 'day-number';
  dayNumber.textContent = date.getDate();
  dayCell.appendChild(dayNumber);
  const dayData = appState.personal.repData[dateStr] || {};
  const repsContainer = document.createElement('div');
  repsContainer.className = 'day-reps-container';
  Object.keys(dayData).forEach((exercise) => {
    const reps = dayData[exercise].total;
    if (reps > 0 && exerciseData[exercise]) {
      const repsDisplay = document.createElement('div');
      repsDisplay.className = 'day-reps';
      if (appState.ui.calendarView === 'weekly') {
        repsDisplay.innerHTML = `${exerciseData[exercise].icon}<span>${reps}</span>`;
        const icon = repsDisplay.querySelector('svg');
        if (icon) {
          icon.style.stroke = exerciseData[exercise].color;
        }
      } else {
        repsDisplay.textContent = reps;
        repsDisplay.style.backgroundColor = exerciseData[exercise].color;
      }
      repsContainer.appendChild(repsDisplay);
    }
  });
  dayCell.appendChild(repsContainer);
  if (dateStr === getFormattedDate(new Date())) dayCell.classList.add('today');
  if (dateStr === getFormattedDate(appState.ui.selectedDate)) dayCell.classList.add('selected');
  dayCell.addEventListener('click', () => {
    appState.ui.selectedDate = new Date(date);
    renderApp();
  });
  return dayCell;
}

function updateSlider(angle) {
  const a = Math.max(0, angle);
  const progressAngle = a % 360;
  const isLargeArc = progressAngle > 180 ? 1 : 0;
  const x = slider.center + slider.radius * Math.sin(progressAngle * Math.PI / 180);
  const y = slider.center - slider.radius * Math.cos(progressAngle * Math.PI / 180);
  const pathData = `M ${slider.center},${slider.center - slider.radius} A ${slider.radius},${slider.radius} 0 ${isLargeArc},1 ${x},${y}`;
  dom.progressCircle.setAttribute('d', pathData);
  dom.handleCircle.setAttribute('cx', x);
  dom.handleCircle.setAttribute('cy', y);
  const remainingReps = Math.max(0, appState.personal.dailyGoal - appState.personal.totalReps);
  currentSliderReps = Math.min(remainingReps, Math.floor(a / (360 / slider.repsPerRotation)));
  dom.modalRepCount.textContent = currentSliderReps;
}

function resetSlider() {
  slider.isDragging = false;
  slider.startAngle = 0;
  slider.currentAngle = 0;
  updateSlider(0);
}

function getAngle(event) {
  const rect = dom.circularSlider.getBoundingClientRect();
  const clientX = event.clientX || event.touches[0].clientX;
  const clientY = event.clientY || event.touches[0].clientY;
  const x = clientX - rect.left - rect.width / 2;
  const y = clientY - rect.top - rect.height / 2;
  return (Math.atan2(y, x) * 180 / Math.PI + 90 + 360) % 360;
}

function handleDragStart(event) {
  event.preventDefault();
  slider.isDragging = true;
  slider.startAngle = getAngle(event);
}

function handleDragMove(event) {
  if (!slider.isDragging) {
    return;
  }
  event.preventDefault();
  const newAngle = getAngle(event);
  let angleDiff = newAngle - slider.startAngle;
  if (angleDiff > 180) angleDiff -= 360;
  if (angleDiff < -180) angleDiff += 360;
  const newTotalAngle = slider.currentAngle + angleDiff;
  const potentialReps = Math.floor(Math.max(0, newTotalAngle) / (360 / slider.repsPerRotation));
  const remainingReps = Math.max(0, appState.personal.dailyGoal - appState.personal.totalReps);
  if (potentialReps <= remainingReps) {
    slider.currentAngle = Math.max(0, newTotalAngle);
    updateSlider(slider.currentAngle);
  }
  slider.startAngle = newAngle;
}

function handleDragEnd() {
  slider.isDragging = false;
}

function renderExercisePicker() {
  dom.exercisePicker.innerHTML = '';
  exercises.forEach((exercise) => {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'picker-item';
    item.innerHTML = `${exerciseData[exercise].icon} <span>${exercise}</span>`;
    const icon = item.querySelector('svg');
    if (icon) {
      icon.style.stroke = exerciseData[exercise].color;
    }
    if (exercise === selectedExerciseInPicker) {
      item.classList.add('selected');
      item.style.borderColor = exerciseData[exercise].color;
    }
    item.addEventListener('click', () => {
      selectedExerciseInPicker = exercise;
      renderExercisePicker();
    });
    dom.exercisePicker.appendChild(item);
  });
}

function openModal(element) {
  element.style.display = 'flex';
}

function closeModal(element) {
  element.style.display = 'none';
}

function renderGroupProgress() {
  const activeGroup = appState.group.groups.find((group) => group.id === appState.group.activeGroupId);
  dom.groupProgressDate.textContent = appState.ui.selectedDate.toLocaleDateString('default', { month: 'short', day: 'numeric', year: 'numeric' });
  dom.groupProgressList.innerHTML = '';
  dom.groupProgressContainer.hidden = !activeGroup || appState.session.status !== 'signed_in';
  if (!dom.groupProgressContainer.hidden) {
    dom.groupProgressEmpty.textContent = 'Group progress rendering will be connected once PocketBase collections are in place.';
  }
}

function renderGroupPicker() {
  dom.groupPicker.innerHTML = '';
  if (appState.group.groups.length === 0) {
    dom.groupPicker.innerHTML = '<p class="member-empty-note">No groups available yet.</p>';
    return;
  }

  appState.group.groups.forEach((group) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'picker-item';
    button.innerHTML = `<span>${group.name}</span><span>${group.joinCode || ''}</span>`;
    if (group.id === appState.group.selectedGroupId) {
      button.classList.add('selected');
      button.style.borderColor = '#007AFF';
    }
    button.addEventListener('click', () => {
      appState.group.selectedGroupId = group.id;
      renderGroupPicker();
    });
    dom.groupPicker.appendChild(button);
  });
}

async function handleCreateGroup() {
  const groupName = dom.createGroupInput.value.trim();
  if (groupName.length < 2) {
    setInlineFeedback(dom.createGroupFeedback, 'Group name must be at least 2 characters.');
    return;
  }

  dom.confirmCreateGroupBtn.disabled = true;
  setInlineFeedback(dom.createGroupFeedback, '', true);
  try {
    const newGroup = await createRecord(COLLECTIONS.groups, {
      name: groupName,
      owner: appState.session.user.id,
      joinCode: generateJoinCode(),
      isActive: true
    });

    await createRecord(COLLECTIONS.groupMembers, {
      group: newGroup.id,
      user: appState.session.user.id,
      role: 'owner',
      status: 'active',
      joinedAt: new Date().toISOString()
    });

    await loadGroups();
    setActiveGroup(newGroup.id);
    closeModal(dom.createGroupModal);
    dom.createGroupInput.value = '';
    setInlineFeedback(dom.groupFeedback, `Active group set to ${newGroup.name}.`);
    renderApp();
  } catch (error) {
    setInlineFeedback(dom.createGroupFeedback, error.message);
  } finally {
    dom.confirmCreateGroupBtn.disabled = false;
  }
}

async function findGroupByJoinCode(joinCode) {
  const response = await listRecords(COLLECTIONS.groups, {
    page: '1',
    perPage: '1',
    filter: `joinCode="${escapeFilterValue(joinCode)}" && isActive=true`
  });
  return response.items[0] || null;
}

async function findExistingMembership(groupId) {
  const response = await listRecords(COLLECTIONS.groupMembers, {
    page: '1',
    perPage: '1',
    filter: `group="${escapeFilterValue(groupId)}" && user="${escapeFilterValue(appState.session.user.id)}"`
  });
  return response.items[0] || null;
}

async function handleJoinGroup() {
  const joinCode = dom.joinGroupInput.value.trim().toUpperCase();
  if (!joinCode) {
    setInlineFeedback(dom.joinGroupFeedback, 'Join code is required.');
    return;
  }

  dom.confirmJoinGroupBtn.disabled = true;
  setInlineFeedback(dom.joinGroupFeedback, '', true);
  try {
    const group = await findGroupByJoinCode(joinCode);
    if (!group) {
      throw new Error('No active group found for that join code.');
    }

    const existingMembership = await findExistingMembership(group.id);
    if (!existingMembership) {
      await createRecord(COLLECTIONS.groupMembers, {
        group: group.id,
        user: appState.session.user.id,
        role: 'member',
        status: 'active',
        joinedAt: new Date().toISOString()
      });
    }

    await loadGroups();
    setActiveGroup(group.id);
    closeModal(dom.joinGroupModal);
    dom.joinGroupInput.value = '';
    setInlineFeedback(dom.groupFeedback, `Joined ${group.name}.`);
    renderApp();
  } catch (error) {
    setInlineFeedback(dom.joinGroupFeedback, error.message);
  } finally {
    dom.confirmJoinGroupBtn.disabled = false;
  }
}

function handleSwitchGroup() {
  if (!appState.group.selectedGroupId) {
    setInlineFeedback(dom.switchGroupFeedback, 'Select a group first.');
    return;
  }
  setActiveGroup(appState.group.selectedGroupId);
  closeModal(dom.switchGroupModal);
  setInlineFeedback(dom.groupFeedback, 'Active group updated.');
  renderApp();
}

function renderApp() {
  deriveSelectedPersonalState();
  renderAuthState();
  renderGroupSummary();
  renderTrackerInteractivity();
  renderPersonalTracker();
  renderHistory();
  renderCalendar();
  renderGroupProgress();
}

function bindEvents() {
  dom.themeToggle.addEventListener('click', () => {
    const nextTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    applyTheme(nextTheme);
  });
  dom.authForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    await handleAuthSubmit();
  });
  dom.authModeToggle.addEventListener('click', () => {
    appState.authMode = appState.authMode === 'signin' ? 'signup' : 'signin';
    setInlineFeedback(dom.authFeedback, '', true);
    resetAuthForm();
    renderApp();
  });
  dom.signOutBtn.addEventListener('click', signOut);
  dom.createGroupBtn.addEventListener('click', () => {
    setInlineFeedback(dom.groupFeedback, '', true);
    setInlineFeedback(dom.createGroupFeedback, '', true);
    dom.createGroupInput.value = '';
    openModal(dom.createGroupModal);
  });
  dom.joinGroupBtn.addEventListener('click', () => {
    setInlineFeedback(dom.groupFeedback, '', true);
    setInlineFeedback(dom.joinGroupFeedback, '', true);
    dom.joinGroupInput.value = '';
    openModal(dom.joinGroupModal);
  });
  dom.switchGroupBtn.addEventListener('click', () => {
    setInlineFeedback(dom.groupFeedback, '', true);
    setInlineFeedback(dom.switchGroupFeedback, '', true);
    appState.group.selectedGroupId = appState.group.activeGroupId || appState.group.groups[0]?.id || '';
    renderGroupPicker();
    openModal(dom.switchGroupModal);
  });
  dom.confirmCreateGroupBtn.addEventListener('click', handleCreateGroup);
  dom.cancelCreateGroupBtn.addEventListener('click', () => closeModal(dom.createGroupModal));
  dom.confirmJoinGroupBtn.addEventListener('click', handleJoinGroup);
  dom.cancelJoinGroupBtn.addEventListener('click', () => closeModal(dom.joinGroupModal));
  dom.confirmSwitchGroupBtn.addEventListener('click', handleSwitchGroup);
  dom.cancelSwitchGroupBtn.addEventListener('click', () => closeModal(dom.switchGroupModal));
  dom.showRepModalBtn.addEventListener('click', () => {
    openModal(dom.repModal);
    resetSlider();
  });
  dom.cancelRepsBtn.addEventListener('click', () => closeModal(dom.repModal));
  dom.confirmRepsBtn.addEventListener('click', () => {
    if (currentSliderReps > 0) {
      dom.successSound.currentTime = 0;
      dom.successSound.play().catch(() => {});
      appState.personal.totalReps += currentSliderReps;
      appState.personal.history.push({
        amount: currentSliderReps,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      persistPersonalState();
      renderApp();
      closeModal(dom.repModal);
    }
  });
  dom.setGoalBtn.addEventListener('click', () => {
    const newGoal = prompt('What is your new daily goal?', String(appState.personal.dailyGoal));
    if (newGoal && !Number.isNaN(Number(newGoal)) && Number(newGoal) > 0) {
      appState.personal.dailyGoal = parseInt(newGoal, 10);
      persistPersonalState();
      renderApp();
    }
  });
  dom.shareBtn.addEventListener('click', () => {
    const text = `🔥 I crushed ${appState.personal.totalReps} ${appState.personal.currentExercise.toLowerCase()}! My daily goal is ${appState.personal.dailyGoal}.`;
    if (navigator.share) {
      navigator.share({ title: 'My Workout Progress', text, url: window.location.href }).catch(() => {});
    } else {
      alert(text);
    }
  });
  dom.resetBtn.addEventListener('click', () => {
    if (confirm(`This will permanently delete your ${appState.personal.currentExercise} history for this date. Are you sure?`)) {
      appState.personal.totalReps = 0;
      appState.personal.history = [];
      persistPersonalState();
      renderApp();
    }
  });
  dom.calendarViewToggle.addEventListener('click', () => {
    if (appState.ui.calendarView === 'monthly') {
      appState.ui.calendarView = 'weekly';
    } else if (appState.ui.calendarView === 'weekly') {
      appState.ui.calendarView = 'daily';
    } else {
      appState.ui.calendarView = 'monthly';
    }
    localStorage.setItem(STORAGE_KEYS.calendarView, appState.ui.calendarView);
    renderCalendar();
  });
  dom.prevMonthBtn.addEventListener('click', () => {
    if (appState.ui.calendarView === 'monthly') {
      appState.ui.selectedDate.setMonth(appState.ui.selectedDate.getMonth() - 1);
    } else if (appState.ui.calendarView === 'weekly') {
      appState.ui.selectedDate.setDate(appState.ui.selectedDate.getDate() - 7);
    } else {
      appState.ui.selectedDate.setDate(appState.ui.selectedDate.getDate() - 1);
    }
    renderApp();
  });
  dom.nextMonthBtn.addEventListener('click', () => {
    if (appState.ui.calendarView === 'monthly') {
      appState.ui.selectedDate.setMonth(appState.ui.selectedDate.getMonth() + 1);
    } else if (appState.ui.calendarView === 'weekly') {
      appState.ui.selectedDate.setDate(appState.ui.selectedDate.getDate() + 7);
    } else {
      appState.ui.selectedDate.setDate(appState.ui.selectedDate.getDate() + 1);
    }
    renderApp();
  });
  dom.exerciseTitleBtn.addEventListener('click', () => {
    selectedExerciseInPicker = appState.personal.currentExercise;
    renderExercisePicker();
    openModal(dom.exerciseModal);
  });
  dom.confirmExerciseBtn.addEventListener('click', () => {
    appState.personal.currentExercise = selectedExerciseInPicker;
    localStorage.setItem(STORAGE_KEYS.currentExercise, selectedExerciseInPicker);
    renderApp();
    closeModal(dom.exerciseModal);
  });
  dom.exerciseModal.addEventListener('click', (event) => {
    if (event.target === dom.exerciseModal) {
      closeModal(dom.exerciseModal);
    }
  });
  dom.createGroupModal.addEventListener('click', (event) => {
    if (event.target === dom.createGroupModal) {
      closeModal(dom.createGroupModal);
    }
  });
  dom.joinGroupModal.addEventListener('click', (event) => {
    if (event.target === dom.joinGroupModal) {
      closeModal(dom.joinGroupModal);
    }
  });
  dom.switchGroupModal.addEventListener('click', (event) => {
    if (event.target === dom.switchGroupModal) {
      closeModal(dom.switchGroupModal);
    }
  });
  dom.circularSlider.addEventListener('mousedown', handleDragStart);
  document.addEventListener('mousemove', handleDragMove);
  document.addEventListener('mouseup', handleDragEnd);
  dom.circularSlider.addEventListener('touchstart', handleDragStart, { passive: false });
  document.addEventListener('touchmove', handleDragMove, { passive: false });
  document.addEventListener('touchend', handleDragEnd);
}

function startMidnightWatcher() {
  setInterval(() => {
    const nowStr = getFormattedDate(new Date());
    const todayStr = getFormattedDate(currentDate);
    if (nowStr !== todayStr) {
      currentDate = new Date();
      appState.ui.selectedDate = new Date();
      renderApp();
    }
  }, 60000);
}

async function initializeApp() {
  applyTheme(appState.ui.theme);
  bindEvents();
  await restoreSession();
  deriveSelectedPersonalState();
  renderApp();
  startMidnightWatcher();
}

initializeApp();
