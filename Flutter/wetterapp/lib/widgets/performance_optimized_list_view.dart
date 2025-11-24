import 'package:flutter/material.dart';

class PerformanceOptimizedListView extends StatelessWidget {
  final int itemCount;
  final Widget Function(BuildContext, int) itemBuilder;
  final Axis scrollDirection;
  final ScrollPhysics? physics;
  final double? height;

  const PerformanceOptimizedListView({
    super.key,
    required this.itemCount,
    required this.itemBuilder,
    this.scrollDirection = Axis.vertical,
    this.physics,
    this.height,
  });

  @override
  Widget build(BuildContext context) {
    Widget listView = ListView.builder(
      scrollDirection: scrollDirection,
      physics: physics ?? const BouncingScrollPhysics(),
      itemCount: itemCount,
      itemBuilder: itemBuilder,
      // Performance optimizations
      cacheExtent: 200.0, // Cache mehr Widgets für smoothes Scrolling
      addAutomaticKeepAlives: true, // Behalte Widgets im Speicher
      addRepaintBoundaries: true, // Reduziere Repaint-Bereiche
    );

    if (height != null) {
      return SizedBox(height: height, child: listView);
    }

    return listView;
  }
}
