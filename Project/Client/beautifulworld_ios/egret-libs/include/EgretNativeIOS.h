#import <UIKit/UIKit.h>

@interface EgretNativeConfig : NSObject

@property (nonatomic) bool showFPS;
@property (nonatomic) int fpsLogTime;
@property (nonatomic) bool disableNativeRender;
@property (nonatomic) bool enableGLBatch;
@property (nonatomic) bool clearCache;
@property (nonatomic) unsigned long loadingTimeout;
@property (nonatomic) NSString* preloadPath;

@end

@interface EgretNativeIOS : NSObject

- (instancetype)init;
- (UIView*)createEAGLView;
- (bool)initWithViewController:(UIViewController*)viewController;
- (UIViewController*)getRootViewController;
- (NSString*)getRuntimeVersion;
- (void)startGame:(NSString*)gameUrl;
- (void)pause;
- (void)resume;

- (void)setExternalInterface:(NSString*)funcName Callback:(void(^)(NSString*))callback;
- (void)callExternalInterface:(NSString*)funcName Value:(NSString*)value;

- (void)setFPSBoardEnable:(bool)enable;

- (NSString*)getNetworkState;
- (void)setNetworkStatusChangeCallback:(void(^)(NSString*))callback;

- (void)destroy;

@property (nonatomic, strong) UIWindow* window;
@property (nonatomic, readonly, strong) EgretNativeConfig* config;

@end
