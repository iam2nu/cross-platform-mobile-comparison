class Credential {
  final String id;
  final String title;
  final String username;
  final String password;
  final DateTime createdAt;
  final DateTime? modifiedAt;
  final String? url;
  final String? notes;
  final bool isFavorite;
  final List<String> passwordHistory;

  Credential({
    required this.id,
    required this.title,
    required this.username,
    required this.password,
    required this.createdAt,
    this.modifiedAt,
    this.url,
    this.notes,
    this.isFavorite = false,
    this.passwordHistory = const [],
  });

  Map<String, dynamic> toJson() => {
    'id': id,
    'title': title,
    'username': username,
    'password': password,
    'createdAt': createdAt.toIso8601String(),
    'modifiedAt': modifiedAt?.toIso8601String(),
    'url': url,
    'notes': notes,
    'isFavorite': isFavorite,
    'passwordHistory': passwordHistory,
  };

  factory Credential.fromJson(Map<String, dynamic> json) => Credential(
    id: json['id'],
    title: json['title'],
    username: json['username'],
    password: json['password'],
    createdAt: DateTime.parse(json['createdAt']),
    modifiedAt: json['modifiedAt'] != null
        ? DateTime.parse(json['modifiedAt'])
        : null,
    url: json['url'],
    notes: json['notes'],
    isFavorite: json['isFavorite'] ?? false,
    passwordHistory: json['passwordHistory'] != null 
        ? List<String>.from(json['passwordHistory'])
        : [],
  );

  Credential copyWith({
    String? id,
    String? title,
    String? username,
    String? password,
    DateTime? createdAt,
    DateTime? modifiedAt,
    String? url,
    String? notes,
    bool? isFavorite,
    List<String>? passwordHistory,
  }) => Credential(
    id: id ?? this.id,
    title: title ?? this.title,
    username: username ?? this.username,
    password: password ?? this.password,
    createdAt: createdAt ?? this.createdAt,
    modifiedAt: modifiedAt ?? this.modifiedAt,
    url: url ?? this.url,
    notes: notes ?? this.notes,
    isFavorite: isFavorite ?? this.isFavorite,
    passwordHistory: passwordHistory ?? this.passwordHistory,
  );
}
